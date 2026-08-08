import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

/**
 * `datasource.url` là BẮT BUỘC khi có file prisma.config.ts.
 *
 * Đã thử bỏ nó đi (để `prisma generate` không đòi DATABASE_URL) nhưng CLI 6.19
 * hỏng ngay: `prisma migrate` báo "Cannot destructure property 'url'". Mà
 * `migrate deploy` là bước bắt buộc trong build trên Render.
 *
 * Đổi lại: mọi lệnh prisma đều cần DATABASE_URL, kể cả `generate`. Chấp nhận
 * được vì môi trường build nào cũng phải có biến này rồi.
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
