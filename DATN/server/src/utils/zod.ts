import { z } from 'zod';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .max(180, 'Email quá dài')
  .refine((value) => EMAIL_PATTERN.test(value), 'Email không hợp lệ');

export const optionalEmailField = z
  .union([emailField, z.literal('')])
  .optional()
  .transform((value) => (value ? value : null));

export const passwordField = z
  .string()
  .min(6, 'Mật khẩu tối thiểu 6 ký tự')
  .max(72, 'Mật khẩu tối đa 72 ký tự');


export const phoneField = z
  .string()
  .trim()
  .regex(/^0\d{9}$/, 'Số điện thoại phải gồm 10 số và bắt đầu bằng 0');

export const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value ? value : null));

export const idParam = z.object({
  id: z.coerce.number().int().positive('id không hợp lệ'),
});

export const booleanish = z
  .union([z.boolean(), z.enum(['true', 'false', '1', '0'])])
  .transform((value) =>
    typeof value === 'boolean' ? value : value === 'true' || value === '1',
  );

const emptyToUndefined = (value: unknown) =>
  value === '' || value === null ? undefined : value;

export const optionalNumberQuery = (min = 0) =>
  z.preprocess(emptyToUndefined, z.coerce.number().min(min).optional());

export const optionalIntQuery = (min = 0) =>
  z.preprocess(emptyToUndefined, z.coerce.number().int().min(min).optional());

export const optionalStringQuery = (max: number) =>
  z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());

export const optionalBooleanQuery = z.preprocess(emptyToUndefined, booleanish.optional());
