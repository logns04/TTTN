import type { Request, Response } from 'express';
import { unauthorized } from '../../utils/AppError';
import { ok } from '../../utils/apiResponse';
import { sepayWebhookSchema } from './schema';
import * as service from './service';

/**
 * Endpoint SePay gọi khi có biến động số dư.
 *
 * Cố ý trả về đúng `{"success": true}` chứ không dùng envelope chung của app:
 * tài liệu SePay yêu cầu HTTP 200/201 kèm đúng body này, nếu khác nó coi là
 * thất bại và gửi lại.
 *
 * Lỗi hệ thống thì để throw ra errorHandler (500) — lúc đó SePay gửi lại là
 * đúng mong muốn, vì giao dịch chưa được lưu.
 */
export const sepayWebhook = async (req: Request, res: Response) => {
  const payload = sepayWebhookSchema.parse(req.body);
  const result = await service.handleSepayWebhook(payload);

  // Ghi log để đối soát: đây là đường duy nhất tiền vào hệ thống.
  console.log(
    `[sepay] id=${payload.id} ${payload.transferAmount}đ ` +
      `don=${result.matchedOrder ?? '-'} ` +
      `${result.markedPaid ? 'DA XAC NHAN' : result.reason ?? ''}`,
  );

  res.json({ success: true });
};

export const paymentInfo = async (req: Request, res: Response) => {
  if (!req.user) throw unauthorized();
  ok(res, await service.getPaymentInfo(Number(req.params.id), req.user));
};

export const list = async (_req: Request, res: Response) => {
  ok(res, await service.listPayments());
};
