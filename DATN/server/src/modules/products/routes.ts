import { Router } from 'express';
import { ADMIN_ROLES, optionalAuth, requireAuth, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { idParam } from '../../utils/zod';
import * as controller from './controller';
import { productBodySchema } from './schema';

export const productRouter = Router();

const writeGuard = [requireAuth, requireRole(...ADMIN_ROLES)] as const;

productRouter.get('/', optionalAuth, controller.list);

productRouter.get('/admin/:id', ...writeGuard, validate({ params: idParam }), controller.detailById);
productRouter.get('/:id/related', validate({ params: idParam }), controller.related);
productRouter.get('/:slug', optionalAuth, controller.detailBySlug);

productRouter.post('/', ...writeGuard, validate({ body: productBodySchema }), controller.create);
productRouter.put(
  '/:id',
  ...writeGuard,
  validate({ params: idParam, body: productBodySchema }),
  controller.update,
);
productRouter.delete('/:id', ...writeGuard, validate({ params: idParam }), controller.remove);
