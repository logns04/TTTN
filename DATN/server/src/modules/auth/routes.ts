import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './controller';
import { loginSchema, registerSchema, updateProfileSchema } from './schema';

export const authRouter = Router();

authRouter.post('/register', validate({ body: registerSchema }), controller.register);
authRouter.post('/login', validate({ body: loginSchema }), controller.login);
authRouter.post('/logout', requireAuth, controller.logout);
authRouter.get('/me', requireAuth, controller.me);
authRouter.put(
  '/me',
  requireAuth,
  validate({ body: updateProfileSchema }),
  controller.updateProfile,
);
