/**
 * Ghép origin của backend vào đường dẫn ảnh khi cần.
 *
 * DB chứa hai dạng đường dẫn:
 * - Tương đối `/uploads/...` — do provider `local` sinh ra
 * - Tuyệt đối `https://res.cloudinary.com/...` — do provider `cloudinary` sinh ra
 *
 * Hàm này để nguyên URL tuyệt đối và chỉ thêm origin cho đường dẫn tương đối.
 * Nhờ vậy DB không ghi cứng origin, đổi domain hay chuyển sang Cloudinary đều
 * không phải sửa dữ liệu.
 *
 * Dev: VITE_API_URL rỗng nên giữ nguyên `/uploads/...` và Vite proxy lo phần còn lại.
 */
import { API_ORIGIN } from './apiOrigin';

export const resolveImageUrl = (url?: string | null): string => {
  if (!url) return '';

  // Đã là URL tuyệt đối, protocol-relative, data: hoặc blob: (ảnh xem trước
  // trước khi upload) thì dùng nguyên.
  if (/^(https?:)?\/\//i.test(url) || /^(data|blob):/i.test(url)) return url;

  return `${API_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
};
