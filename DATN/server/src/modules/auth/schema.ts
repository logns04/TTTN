import { z } from 'zod';
import { emailField, optionalText, passwordField } from '../../utils/zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Họ tên tối thiểu 2 ký tự').max(120),
  email: emailField,
  password: passwordField,
  phone: optionalText(20),
  address: optionalText(255),
});

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, 'Họ tên tối thiểu 2 ký tự').max(120),
  phone: optionalText(20),
  address: optionalText(255),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
