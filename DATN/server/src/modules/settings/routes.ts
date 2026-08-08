import { Role } from '@prisma/client';
import { Router } from 'express';
import { STAFF_ROLES, requireAuth, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './controller';
import { updateSettingsSchema } from './schema';

export const settingsRouter = Router();

// Public: client cần logo, tên site, màu nhấn và các cờ ẩn/hiện section.
settingsRouter.get('/', controller.getPublic);

settingsRouter.get(
  '/admin',
  requireAuth,
  requireRole(...STAFF_ROLES),
  controller.getForAdmin,
);

// Chỉ SUPERADMIN được đổi giao diện (spec mục 6).
settingsRouter.put(
  '/',
  requireAuth,
  requireRole(Role.SUPERADMIN),
  validate({ body: updateSettingsSchema }),
  controller.update,
);
