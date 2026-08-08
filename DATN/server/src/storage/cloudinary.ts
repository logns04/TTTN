import crypto from 'node:crypto';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';
import type { SavedFile, StorageProvider, UploadedFile } from './types';

const FOLDER = 'noithat';

/**
 * Upload trực tiếp qua REST API của Cloudinary bằng fetch có sẵn của Node 22 —
 * cố ý không thêm SDK `cloudinary` vào dependency cho một việc chỉ cần hai
 * endpoint.
 *
 * Chữ ký: sha1 của các tham số đã sort theo alphabet, nối api_secret vào cuối.
 */
const sign = (params: Record<string, string>): string => {
  const canonical = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto
    .createHash('sha1')
    .update(canonical + env.CLOUDINARY_API_SECRET)
    .digest('hex');
};

const endpoint = (action: 'upload' | 'destroy') =>
  `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/${action}`;

export const cloudinaryStorage: StorageProvider = {
  name: 'cloudinary',

  async save(file: UploadedFile): Promise<SavedFile> {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = sign({ folder: FOLDER, timestamp });

    const form = new FormData();
    form.append('file', new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }), file.originalname);
    form.append('api_key', env.CLOUDINARY_API_KEY!);
    form.append('timestamp', timestamp);
    form.append('folder', FOLDER);
    form.append('signature', signature);

    const response = await fetch(endpoint('upload'), { method: 'POST', body: form });

    if (!response.ok) {
      const detail = await response.text();
      throw new AppError(502, 'Upload ảnh lên Cloudinary thất bại', detail.slice(0, 300));
    }

    const result = (await response.json()) as { secure_url: string; public_id: string };
    return { url: result.secure_url, key: result.public_id };
  },

  async remove(key: string): Promise<void> {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = sign({ public_id: key, timestamp });

    const form = new FormData();
    form.append('public_id', key);
    form.append('api_key', env.CLOUDINARY_API_KEY!);
    form.append('timestamp', timestamp);
    form.append('signature', signature);

    // Xoá thất bại thì chỉ log: không đáng để làm fail cả request nghiệp vụ
    // chỉ vì một file rác còn sót trên Cloudinary.
    const response = await fetch(endpoint('destroy'), { method: 'POST', body: form });
    if (!response.ok) {
      console.warn('[cloudinary] xoá ảnh thất bại:', key, await response.text());
    }
  },
};
