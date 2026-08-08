import type { Role } from '@prisma/client';

/** Payload nằm trong JWT và được gắn vào req.user sau khi xác thực. */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: Role;
}
