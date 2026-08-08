import { z } from 'zod';

// Cố ý dùng regex thay cho z.string().email(): API email của Zod đổi giữa v3 và
// v4, còn regex thì chạy trên cả hai. Đây là kiểm tra định dạng cơ bản, không
// nhằm thay thế việc xác minh email thật.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .max(180, 'Email quá dài')
  .refine((value) => EMAIL_PATTERN.test(value), 'Email không hợp lệ');

/** Email không bắt buộc: chuỗi rỗng được coi như không nhập. */
export const optionalEmailField = z
  .union([emailField, z.literal('')])
  .optional()
  .transform((value) => (value ? value : null));

export const passwordField = z
  .string()
  .min(6, 'Mật khẩu tối thiểu 6 ký tự')
  .max(72, 'Mật khẩu tối đa 72 ký tự');

/** Số điện thoại Việt Nam: 10 số bắt đầu bằng 0, cho phép bỏ trống. */
export const phoneField = z
  .string()
  .trim()
  .regex(/^0\d{9}$/, 'Số điện thoại phải gồm 10 số và bắt đầu bằng 0');

/** Chuỗi tuỳ chọn: coi chuỗi rỗng như không nhập, trả về null cho Prisma. */
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

/** Nhận cả boolean thật và chuỗi "true"/"false" từ form-data. */
export const booleanish = z
  .union([z.boolean(), z.enum(['true', 'false', '1', '0'])])
  .transform((value) =>
    typeof value === 'boolean' ? value : value === 'true' || value === '1',
  );

// Query string hay gửi field rỗng (?minPrice=&search=). Nếu để nguyên thì
// z.coerce.number() biến '' thành 0 và bộ lọc sai âm thầm. Các helper dưới đây
// coi chuỗi rỗng là "không truyền".
const emptyToUndefined = (value: unknown) =>
  value === '' || value === null ? undefined : value;

export const optionalNumberQuery = (min = 0) =>
  z.preprocess(emptyToUndefined, z.coerce.number().min(min).optional());

export const optionalIntQuery = (min = 0) =>
  z.preprocess(emptyToUndefined, z.coerce.number().int().min(min).optional());

export const optionalStringQuery = (max: number) =>
  z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());

export const optionalBooleanQuery = z.preprocess(emptyToUndefined, booleanish.optional());
