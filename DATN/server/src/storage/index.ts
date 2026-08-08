import { env } from '../config/env';
import { localStorage } from './local';
import type { StorageProvider } from './types';

/**
 * Chọn nơi chứa ảnh theo biến môi trường STORAGE_DRIVER.
 *
 * Thêm Cloudinary sau chỉ cần: viết src/storage/cloudinary.ts export một
 * StorageProvider, rồi thêm một nhánh ở đây. Không sửa module nghiệp vụ nào.
 */
const resolveStorage = (): StorageProvider => {
  if (env.STORAGE_DRIVER === 'cloudinary') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { cloudinaryStorage } = require('./cloudinary') as {
      cloudinaryStorage: StorageProvider;
    };
    return cloudinaryStorage;
  }
  return localStorage;
};

export const storage = resolveStorage();

export * from './types';
