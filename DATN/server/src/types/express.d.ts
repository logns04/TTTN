import type { AuthUser } from './auth';

declare global {
  namespace Express {
    interface Request {
      /** Có giá trị sau khi đi qua requireAuth hoặc optionalAuth. */
      user?: AuthUser;
    }
  }
}

export {};
