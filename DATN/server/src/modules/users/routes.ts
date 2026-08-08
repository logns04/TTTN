import { Role } from '@prisma/client';
import { Router } from 'express';
import { ADMIN_ROLES, requireAuth, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { idParam } from '../../utils/zod';
import * as controller from './controller';
import { userCreateSchema, userUpdateSchema } from './schema';

export const userRouter = Router();

userRouter.use(requireAuth);

// ADMIN chỉ được xem danh sách; mọi thao tác ghi thuộc SUPERADMIN (spec mục 6).
const viewGuard = requireRole(...ADMIN_ROLES);
const writeGuard = requireRole(Role.SUPERADMIN);

userRouter.get('/', viewGuard, controller.list);
userRouter.get('/:id', viewGuard, validate({ params: idParam }), controller.detail);

userRouter.post('/', writeGuard, validate({ body: userCreateSchema }), controller.create);
userRouter.put(
  '/:id',
  writeGuard,
  validate({ params: idParam, body: userUpdateSchema }),
  controller.update,
);
userRouter.delete('/:id', writeGuard, validate({ params: idParam }), controller.remove);
