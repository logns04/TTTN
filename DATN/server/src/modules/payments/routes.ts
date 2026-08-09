import { Router } from 'express';
import { ADMIN_ROLES, requireAuth, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { idParam } from '../../utils/zod';
import * as controller from './controller';
import { requireSepayApiKey } from './webhookAuth';

export const paymentRouter = Router();

paymentRouter.post('/sepay/webhook', requireSepayApiKey, controller.sepayWebhook);

paymentRouter.get(
  '/order/:id',
  requireAuth,
  validate({ params: idParam }),
  controller.paymentInfo,
);

paymentRouter.get('/', requireAuth, requireRole(...ADMIN_ROLES), controller.list);
