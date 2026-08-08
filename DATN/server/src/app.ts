import path from 'node:path';
import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandler, notFound } from './middleware/error';
import { apiRouter } from './routes';

export const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'uploads');

/**
 * Danh sách origin được phép gọi API.
 *
 * CLIENT_URL nhận nhiều giá trị cách nhau bằng dấu phẩy, để một backend phục vụ
 * được cả bản deploy chính lẫn preview mà không phải sửa code.
 *
 * Không dùng `credentials: true`: xác thực bằng Bearer token trong localStorage
 * chứ không dùng cookie, nên không cần gửi credential kèm request.
 */
const allowedOrigins = [
  ...env.CLIENT_URL.split(',').map((value) => value.trim()).filter(Boolean),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

export const createApp = () => {
  const app = express();

  // In ra lúc khởi động: lần deploy trước mất khá lâu mới tìm ra CORS chặn,
  // vì không có cách nào nhìn thấy allowlist thực tế đang là gì.
  console.log('CORS cho phép:', allowedOrigins.join(' | '));

  app.use(cors({ origin: allowedOrigins }));

  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Ảnh ở chế độ STORAGE_DRIVER=local được serve tĩnh từ đây.
  // Chuyển sang Cloudinary thì URL trỏ ra ngoài, route này chỉ còn phục vụ
  // ảnh cũ — không cần bỏ đi.
  app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));

  app.use('/api', apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
