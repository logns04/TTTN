import crypto from 'node:crypto';
import { OrderStatus, type PaymentMethod, type Prisma, Role } from '@prisma/client';
import { shippingFeeFor } from '../../config/business';
import { prisma } from '../../config/prisma';
import type { AuthUser } from '../../types/auth';
import { badRequest, conflict, forbidden, notFoundError } from '../../utils/AppError';
import { buildMeta, parsePagination } from '../../utils/pagination';
import type { CheckoutInput, OrderListQuery } from './schema';

const listSelect = {
  id: true,
  code: true,
  customerName: true,
  customerPhone: true,
  subtotal: true,
  shippingFee: true,
  total: true,
  status: true,
  paymentMethod: true,
  paidAt: true,
  createdAt: true,
  _count: { select: { items: true } },
} as const;

const detailSelect = {
  ...listSelect,
  customerEmail: true,
  shippingAddress: true,
  note: true,
  updatedAt: true,
  userId: true,
  user: { select: { id: true, name: true, email: true } },
  items: {
    select: {
      id: true,
      productId: true,
      productName: true,
      productImage: true,
      price: true,
      quantity: true,
      subtotal: true,
      product: { select: { slug: true } },
    },
    orderBy: { id: 'asc' },
  },
} as const satisfies Prisma.OrderSelect;

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPING, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPING]: [OrderStatus.COMPLETED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
};

const generateCode = (): string =>
  `DH${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(1).toString('hex').toUpperCase()}`;

export const checkout = async (userId: number, input: CheckoutInput) => {
  return prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
      where: { userId },
      select: {
        id: true,
        items: {
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                effectivePrice: true,
                quantity: true,
                status: true,
              },
            },
          },
          orderBy: { id: 'asc' },
        },
      },
    });

    if (!cart || cart.items.length === 0) throw badRequest('Giỏ hàng đang trống');

    const items = cart.items.map((line) => {
      const product = line.product;

      if (!product.status) throw conflict(`Sản phẩm "${product.name}" đã ngừng bán`);
      if (product.quantity < line.quantity) {
        throw conflict(
          product.quantity === 0
            ? `Sản phẩm "${product.name}" đã hết hàng`
            : `Sản phẩm "${product.name}" chỉ còn ${product.quantity} trong kho`,
        );
      }

      const price = Number(product.effectivePrice);
      return {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price,
        quantity: line.quantity,
        subtotal: price * line.quantity,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const shippingFee = shippingFeeFor(subtotal);

    const order = await tx.order.create({
      data: {
        code: generateCode(),
        userId,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        customerEmail: input.customerEmail,
        shippingAddress: input.shippingAddress,
        note: input.note,
        subtotal,
        shippingFee,
        total: subtotal + shippingFee,
        paymentMethod: input.paymentMethod as PaymentMethod,
        items: { create: items },
      },
      select: detailSelect,
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { quantity: { decrement: item.quantity } },
      });
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  });
};

const buildWhere = (query: OrderListQuery, userId?: number): Prisma.OrderWhereInput => {
  const where: Prisma.OrderWhereInput = {};
  if (userId != null) where.userId = userId;
  if (query.status) where.status = query.status as OrderStatus;
  if (query.search) {
    where.OR = [
      { code: { contains: query.search } },
      { customerName: { contains: query.search } },
      { customerPhone: { contains: query.search } },
    ];
  }
  return where;
};

export const list = async (query: OrderListQuery, userId?: number) => {
  const { page, limit, skip, take } = parsePagination(query, 10);
  const where = buildWhere(query, userId);

  const [items, total] = await Promise.all([
    prisma.order.findMany({
      where,
      select: listSelect,
      orderBy: [{ createdAt: 'desc' }],
      skip,
      take,
    }),
    prisma.order.count({ where }),
  ]);

  return { items, meta: buildMeta(total, page, limit) };
};

export const getById = async (id: number, actor: AuthUser) => {
  const order = await prisma.order.findUnique({ where: { id }, select: detailSelect });
  if (!order) throw notFoundError('Không tìm thấy đơn hàng');

  // Khách chỉ xem được đơn của chính mình; nhân viên xem được tất cả.
  const isStaff = actor.role !== Role.USER;
  if (!isStaff && order.userId !== actor.id) {
    throw forbidden('Bạn không có quyền xem đơn hàng này');
  }

  return order;
};

export const updateStatus = async (id: number, next: OrderStatus) => {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        items: { select: { productId: true, quantity: true } },
      },
    });
    if (!order) throw notFoundError('Không tìm thấy đơn hàng');

    if (order.status === next) throw badRequest('Đơn hàng đang ở trạng thái này');

    const allowed = ALLOWED_TRANSITIONS[order.status];
    if (!allowed.includes(next)) {
      throw badRequest(
        allowed.length === 0
          ? 'Đơn hàng đã kết thúc, không thể đổi trạng thái nữa'
          : `Từ trạng thái hiện tại chỉ có thể chuyển sang: ${allowed.join(', ')}`,
      );
    }

    if (next === OrderStatus.CANCELLED) {
      for (const item of order.items) {
        if (item.productId == null) continue;
        await tx.product.update({
          where: { id: item.productId },
          data: { quantity: { increment: item.quantity } },
        });
      }
    }

    return tx.order.update({ where: { id }, data: { status: next }, select: detailSelect });
  });
};
