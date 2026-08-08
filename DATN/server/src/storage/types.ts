export interface UploadedFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface SavedFile {
  /**
   * Đường dẫn ảnh lưu vào DB.
   *
   * - Provider `local` trả **đường dẫn tương đối**: `/uploads/2026-08/abc.png`
   * - Provider `cloudinary` trả **URL tuyệt đối**: `https://res.cloudinary.com/...`
   *
   * Cố ý không ghép origin vào đường dẫn local: nếu ghi cứng
   * `http://localhost:5000` vào DB thì lúc deploy mọi ảnh sẽ trỏ về máy người
   * xem. Phía client tự ghép origin (xem client/src/lib/imageUrl.ts), nên đổi
   * domain về sau không phải seed lại dữ liệu.
   */
  url: string;
  /** Định danh nội bộ để xoá file sau này (đường dẫn tương đối hoặc public_id). */
  key: string;
}

/**
 * Ranh giới duy nhất giữa app và nơi chứa ảnh.
 * Đổi từ ổ đĩa sang Cloudinary chỉ là đổi implement của interface này —
 * không module nghiệp vụ nào phải sửa.
 */
export interface StorageProvider {
  readonly name: string;
  save(file: UploadedFile): Promise<SavedFile>;
  remove(key: string): Promise<void>;
}

/**
 * Đường dẫn công khai (tương đối) của một file trong public/uploads.
 * Ví dụ: `2026-08/abc.png` -> `/uploads/2026-08/abc.png`
 */
export const buildUploadPath = (relativePath: string): string =>
  `/uploads/${relativePath.replace(/^\/+/, '').replace(/\\/g, '/')}`;
