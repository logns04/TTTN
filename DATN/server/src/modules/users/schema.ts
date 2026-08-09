import { z } from 'zod';
import {
  booleanish,
  emailField,
  optionalNumberQuery,
  optionalStringQuery,
  optionalText,
  passwordField,
} from '../../utils/zod';

export const ROLES = ['SUPERADMIN', 'ADMIN', 'EDITOR', 'USER'] as const;

const roleField = z.enum(ROLES, { message: 'Vai trò không hợp lệ' });

export const userCreateSchema = z.object({
  name: z.string().trim().min(2, 'Họ tên tối thiểu 2 ký tự').max(120),
  email: emailField,
  password: passwordField,
  role: roleField,
  phone: optionalText(20),
  address: optionalText(255),
  isActive: booleanish.optional(),
});

export const userUpdateSchema = z.object({
  name: z.string().trim().min(2, 'Họ tên tối thiểu 2 ký tự').max(120),
  email: emailField,

  password: passwordField.optional().or(z.literal('')),
  role: roleField,
  phone: optionalText(20),
  address: optionalText(255),
  isActive: booleanish.optional(),
});

export const userListQuerySchema = z.object({
  page: optionalNumberQuery(1),
  limit: optionalNumberQuery(1),
  search: optionalStringQuery(200),
  role: roleField.optional(),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserListQuery = z.infer<typeof userListQuerySchema>;
