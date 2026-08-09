import { Router } from 'express';
import {
  ADMIN_ROLES,
  STAFF_ROLES,
  optionalAuth,
  requireAuth,
  requireRole,
} from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { idParam } from '../../utils/zod';
import * as controller from './controller';
import { bannerBodySchema } from './schema';

export const bannerRouter = Router();

bannerRouter.get('/', optionalAuth, controller.list);
bannerRouter.get(
  '/:id',
  requireAuth,
  requireRole(...STAFF_ROLES),
  validate({ params: idParam }),
  controller.detail,
);

const editGuard = [requireAuth, requireRole(...STAFF_ROLES)] as const;
const deleteGuard = [requireAuth, requireRole(...ADMIN_ROLES)] as const;

bannerRouter.post('/', ...editGuard, validate({ body: bannerBodySchema }), controller.create);
bannerRouter.put(
  '/:id',
  ...editGuard,
  validate({ params: idParam, body: bannerBodySchema }),
  controller.update,
);
bannerRouter.delete('/:id', ...deleteGuard, validate({ params: idParam }), controller.remove);
