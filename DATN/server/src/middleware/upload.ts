import multer from 'multer';
import { AppError } from '../utils/AppError';

/**
 * Cố ý KHÔNG cho upload SVG: SVG có thể chứa <script>, và ảnh được serve từ
 * chính origin của API. Ảnh placeholder trong public/uploads/seed do script
 * sinh trực tiếp nên không đi qua đường này.
 */
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_FILES = 8;

/**
 * memoryStorage: file nằm trong RAM rồi giao cho StorageProvider quyết định
 * ghi đi đâu. Nhờ vậy đổi sang Cloudinary không phải sửa multer.
 */
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MIME.includes(file.mimetype)) {
      callback(new AppError(400, 'Chỉ nhận ảnh JPG, PNG, WEBP hoặc GIF'));
      return;
    }
    callback(null, true);
  },
});
