import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { buildUploadPath, type SavedFile, type StorageProvider, type UploadedFile } from './types';

const ROOT = path.join(__dirname, '..', '..', 'public', 'uploads');

const EXTENSION_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

const extensionFor = (file: UploadedFile): string => {
  const fromMime = EXTENSION_BY_MIME[file.mimetype];
  if (fromMime) return fromMime;
  const fromName = path.extname(file.originalname).replace('.', '').toLowerCase();
  return fromName || 'bin';
};

/**
 * Lưu ảnh xuống ổ đĩa của server, chia theo thư mục yyyy-mm để một thư mục
 * không phình ra hàng nghìn file.
 *
 * Lưu ý khi deploy Render free: filesystem là ephemeral, ảnh upload sẽ mất sau
 * mỗi lần redeploy. Đổi STORAGE_DRIVER=cloudinary để tránh (xem storage/cloudinary.ts).
 */
export const localStorage: StorageProvider = {
  name: 'local',

  async save(file: UploadedFile): Promise<SavedFile> {
    const now = new Date();
    const folder = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const fileName = `${crypto.randomBytes(10).toString('hex')}.${extensionFor(file)}`;
    const relativePath = `${folder}/${fileName}`;

    await fs.mkdir(path.join(ROOT, folder), { recursive: true });
    await fs.writeFile(path.join(ROOT, relativePath), file.buffer);

    return { url: buildUploadPath(relativePath), key: relativePath };
  },

  async remove(key: string): Promise<void> {
    // Chặn path traversal: key luôn phải nằm trong ROOT.
    const target = path.resolve(ROOT, key);
    if (!target.startsWith(path.resolve(ROOT))) return;

    await fs.rm(target, { force: true });
  },
};
