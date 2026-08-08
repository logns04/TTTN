import { Router } from 'express';
import { ADMIN_ROLES, optionalAuth, requireAuth, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { idParam } from '../../utils/zod';
import * as controller from './controller';
import { categoryBodySchema } from './schema';

export const categoryRouter = Router();

categoryRouter.get('/', controller.list);
categoryRouter.get('/tree', optionalAuth, controller.tree);
categoryRouter.get('/:id', validate({ params: idParam }), controller.detail);

const writeGuard = [requireAuth, requireRole(...ADMIN_ROLES)] as const;

categoryRouter.post('/', ...writeGuard, validate({ body: categoryBodySchema }), controller.create);
categoryRouter.put(
  '/:id',
  ...writeGuard,
  validate({ params: idParam, body: categoryBodySchema }),
  controller.update,
);
categoryRouter.delete('/:id', ...writeGuard, validate({ params: idParam }), controller.remove);
