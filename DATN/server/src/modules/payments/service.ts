import { OrderStatus, Role } from '@prisma/client';
import { env, isSepayConfigured } from '../../config/env';
import { prisma } from '../../config/prisma';
import type { AuthUser } from '../../types/auth';
import { badRequest, forbidden, notFoundError } from '../../utils/AppError';
import type { SepayWebhookPayload } from './schema';


const ORDER_CODE_PATTERN = /DH[A-Z0-9]{4,}/;

export const extractOrderCode = (code?: string | null, content = ''): string | null => {
  const haystack = `${code ?? ''} ${content}`.toUpperCase().replace(/[^A-Z0-9]/g, ' ');
  return haystack.match(ORDER_CODE_PATTERN)?.[0] ?? null;
};

export interface WebhookResult {

  duplicated: boolean;
  matchedOrder: string | null;
  markedPaid: boolean;
  reason?: string;
}


export const handleSepayWebhook = async (
  payload: SepayWebhookPayload,
): Promise<WebhookResult> => {
  const existing = await prisma.payment.findUnique({
    where: { sepayId: payload.id },
    select: { id: true, order: { select: { code: true } } },
  });

  if (existing) {
    return {
      duplicated: true,
      matchedOrder: existing.order?.code ?? null,
      markedPaid: false,
      reason: 'Giao dịch đã được ghi nhận trước đó',
    };
  }

  const isIncoming = payload.transferType.toLowerCase() !== 'out';
  const code = extractOrderCode(payload.code, payload.content);

  const order = code
    ? await prisma.order.findUnique({
        where: { code },
        select: { id: true, code: true, total: true, status: true, paidAt: true },
      })
    : null;

  const transactionDate = payload.transactionDate
    ? new Date(payload.transactionDate)
    : new Date();

  return prisma.$transaction(async (tx) => {
    await tx.payment.create({
      data: {
        sepayId: payload.id,
        orderId: order?.id ?? null,
        gateway: payload.gateway,
        transactionDate: Number.isNaN(transactionDate.getTime()) ? new Date() : transactionDate,
        accountNumber: payload.accountNumber ?? null,
        code: payload.code ?? null,
        content: payload.content.slice(0, 500),
        transferType: payload.transferType,
        amount: payload.transferAmount,
        referenceCode: payload.referenceCode ?? null,
        raw: JSON.stringify(payload),
      },
    });

    const base = { duplicated: false, matchedOrder: order?.code ?? null };

    if (!isIncoming) return { ...base, markedPaid: false, reason: 'Giao dịch tiền ra, bỏ qua' };
    if (!order) {
      return { ...base, markedPaid: false, reason: 'Không tìm thấy mã đơn trong nội dung' };
    }
    if (order.paidAt) {
      return { ...base, markedPaid: false, reason: 'Đơn đã thanh toán trước đó' };
    }
    if (order.status === OrderStatus.CANCELLED) {
      return { ...base, markedPaid: false, reason: 'Đơn đã huỷ' };
    }
  
    if (payload.transferAmount < Number(order.total)) {
      return {
        ...base,
        markedPaid: false,
        reason: `Số tiền chưa đủ (nhận ${payload.transferAmount}, cần ${order.total})`,
      };
    }

    await tx.order.update({
      where: { id: order.id },
      data: {
        paidAt: new Date(),
  
        ...(order.status === OrderStatus.PENDING ? { status: OrderStatus.CONFIRMED } : {}),
      },
    });

    return { ...base, markedPaid: true };
  });
};

export const getPaymentInfo = async (orderId: number, actor: AuthUser) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      code: true,
      total: true,
      status: true,
      paidAt: true,
      userId: true,
      paymentMethod: true,
    },
  });
  if (!order) throw notFoundError('Không tìm thấy đơn hàng');

  if (actor.role === Role.USER && order.userId !== actor.id) {
    throw forbidden('Bạn không có quyền xem đơn hàng này');
  }

  const amount = Number(order.total);

  return {
    orderCode: order.code,
    amount,
    paid: order.paidAt !== null,
    paidAt: order.paidAt,
    status: order.status,
    configured: isSepayConfigured,
    bankAccount: env.SEPAY_BANK_ACCOUNT ?? null,
    bankCode: env.SEPAY_BANK_CODE ?? null,
    accountName: env.SEPAY_ACCOUNT_NAME ?? null,

    transferContent: order.code,
    qrUrl: isSepayConfigured
      ? `https://qr.sepay.vn/img?acc=${encodeURIComponent(env.SEPAY_BANK_ACCOUNT!)}` +
        `&bank=${encodeURIComponent(env.SEPAY_BANK_CODE!)}` +
        `&amount=${amount}&des=${encodeURIComponent(order.code)}`
      : null,
  };
};

export const listPayments = async (limit = 50) =>
  prisma.payment.findMany({
    take: Math.min(limit, 200),
    orderBy: { id: 'desc' },
    select: {
      id: true,
      sepayId: true,
      gateway: true,
      transactionDate: true,
      content: true,
      amount: true,
      transferType: true,
      referenceCode: true,
      order: { select: { id: true, code: true, status: true } },
    },
  });

export const assertWebhookConfigured = () => {
  if (!env.SEPAY_WEBHOOK_API_KEY) {

    throw badRequest('Webhook SePay chưa được cấu hình trên máy chủ');
  }
};
