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
import { newsBodySchema } from './schema';

export const newsRouter = Router();

const editGuard = [requireAuth, requireRole(...STAFF_ROLES)] as const;
const deleteGuard = [requireAuth, requireRole(...ADMIN_ROLES)] as const;

newsRouter.get('/', optionalAuth, controller.list);
newsRouter.get('/admin/:id', ...editGuard, validate({ params: idParam }), controller.detailById);
newsRouter.get('/:slug', optionalAuth, controller.detailBySlug);

newsRouter.post('/', ...editGuard, validate({ body: newsBodySchema }), controller.create);
newsRouter.put(
  '/:id',
  ...editGuard,
  validate({ params: idParam, body: newsBodySchema }),
  controller.update,
);
newsRouter.delete('/:id', ...deleteGuard, validate({ params: idParam }), controller.remove);
