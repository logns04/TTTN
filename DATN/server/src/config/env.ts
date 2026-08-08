import 'dotenv/config';
import { z } from 'zod';

/**
 * Đọc và validate biến môi trường một lần duy nhất lúc khởi động.
 * Thiếu hoặc sai biến thì process chết ngay tại đây, thay vì lỗi mơ hồ lúc chạy.
 */
/**
 * Chấp nhận cả `https://x.com` và `x.com`.
 * Render Blueprint truyền host của service khác qua `fromService` mà không kèm
 * scheme — không muốn người deploy phải nhớ tự thêm `https://`.
 */
const originField = (fallback: string) =>
  z
    .string()
    .min(1)
    .default(fallback)
    .transform((value) =>
      /^https?:\/\//i.test(value) ? value.replace(/\/+$/, '') : `https://${value.replace(/\/+$/, '')}`,
    );

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),

  CLIENT_URL: originField('http://localhost:5173'),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL là bắt buộc'),

  JWT_SECRET: z.string().min(32, 'JWT_SECRET phải dài tối thiểu 32 ký tự'),
  JWT_EXPIRES_IN: z.string().min(1).default('7d'),

  STORAGE_DRIVER: z.enum(['local', 'cloudinary']).default('local'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  // ---- SePay: nhận thanh toán chuyển khoản tự động ----
  // Khoá SePay gửi kèm mỗi webhook ở header `Authorization: Apikey <khoá>`.
  // Thiếu khoá này thì endpoint webhook TỪ CHỐI mọi request — fail-closed, vì
  // nếu không ai cũng có thể giả webhook để đánh dấu đơn đã thanh toán.
  SEPAY_WEBHOOK_API_KEY: z.string().optional(),
  SEPAY_BANK_ACCOUNT: z.string().optional(),
  SEPAY_BANK_CODE: z.string().optional(),
  SEPAY_ACCOUNT_NAME: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const lines = parsed.error.issues.map(
    (issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`,
  );
  console.error('Biến môi trường không hợp lệ:\n' + lines.join('\n'));
  console.error('\nXem server/.env.example để biết cần những biến gì.');
  process.exit(1);
}

export const env = parsed.data;

// Chọn cloudinary thì buộc phải có đủ 3 khoá, không thì fail ngay lúc boot
// chứ đừng để tới lúc user bấm upload mới lỗi.
if (env.STORAGE_DRIVER === 'cloudinary') {
  const missing = (
    ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'] as const
  ).filter((key) => !env[key]);

  if (missing.length > 0) {
    console.error(
      `STORAGE_DRIVER=cloudinary nhưng thiếu: ${missing.join(', ')}`,
    );
    process.exit(1);
  }
}

export const isProduction = env.NODE_ENV === 'production';

/** Có đủ thông tin tài khoản để sinh mã QR chuyển khoản hay chưa. */
export const isSepayConfigured = Boolean(env.SEPAY_BANK_ACCOUNT && env.SEPAY_BANK_CODE);
