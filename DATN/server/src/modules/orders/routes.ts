import { Router } from 'express';
import { ADMIN_ROLES, requireAuth, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { idParam } from '../../utils/zod';
import * as controller from './controller';
import { checkoutSchema, updateStatusSchema } from './schema';

export const orderRouter = Router();

orderRouter.use(requireAuth);

orderRouter.post('/', validate({ body: checkoutSchema }), controller.checkout);

orderRouter.get('/my', controller.listMine);

orderRouter.get('/', requireRole(...ADMIN_ROLES), controller.listAll);

orderRouter.get('/:id', validate({ params: idParam }), controller.detail);

orderRouter.patch(
  '/:id/status',
  requireRole(...ADMIN_ROLES),
  validate({ params: idParam, body: updateStatusSchema }),
  controller.updateStatus,
);
