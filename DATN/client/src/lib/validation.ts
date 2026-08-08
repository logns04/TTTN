import { z } from 'zod';

// Dùng regex thay cho z.string().email() để không phụ thuộc API email đổi giữa
// các bản Zod, và để khớp đúng luật validate ở server.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Vui lòng nhập email')
  .refine((value) => EMAIL_PATTERN.test(value), 'Email không hợp lệ');

export const passwordSchema = z
  .string()
  .min(6, 'Mật khẩu tối thiểu 6 ký tự')
  .max(72, 'Mật khẩu tối đa 72 ký tự');

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^0\d{9}$/, 'Số điện thoại phải gồm 10 số và bắt đầu bằng 0');

/** Số điện thoại không bắt buộc: để trống thì bỏ qua. */
export const optionalPhoneSchema = z
  .union([phoneSchema, z.literal('')])
  .optional()
  .transform((value) => value || undefined);

export const optionalTextSchema = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);
