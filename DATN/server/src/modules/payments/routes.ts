import { Router } from 'express';
import { ADMIN_ROLES, requireAuth, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { idParam } from '../../utils/zod';
import * as controller from './controller';
import { requireSepayApiKey } from './webhookAuth';

export const paymentRouter = Router();

// SePay gọi vào, không phải người dùng đăng nhập -> xác thực bằng API key riêng.
paymentRouter.post('/sepay/webhook', requireSepayApiKey, controller.sepayWebhook);

// Thông tin chuyển khoản của một đơn. Kiểm quyền chủ đơn nằm trong service.
paymentRouter.get(
  '/order/:id',
  requireAuth,
  validate({ params: idParam }),
  controller.paymentInfo,
);

// Đối soát giao dịch, gồm cả giao dịch không khớp đơn nào.
paymentRouter.get('/', requireAuth, requireRole(...ADMIN_ROLES), controller.list);
