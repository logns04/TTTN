import { Role } from '@prisma/client';
import { Router } from 'express';
import { STAFF_ROLES, requireAuth, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './controller';
import { updateSettingsSchema } from './schema';

export const settingsRouter = Router();

settingsRouter.get('/', controller.getPublic);

settingsRouter.get(
  '/admin',
  requireAuth,
  requireRole(...STAFF_ROLES),
  controller.getForAdmin,
);

settingsRouter.put(
  '/',
  requireAuth,
  requireRole(Role.SUPERADMIN),
  validate({ body: updateSettingsSchema }),
  controller.update,
);
