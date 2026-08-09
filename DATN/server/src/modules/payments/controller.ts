import type { Request, Response } from 'express';
import { unauthorized } from '../../utils/AppError';
import { ok } from '../../utils/apiResponse';
import { sepayWebhookSchema } from './schema';
import * as service from './service';

export const sepayWebhook = async (req: Request, res: Response) => {
  const payload = sepayWebhookSchema.parse(req.body);
  const result = await service.handleSepayWebhook(payload);

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
