/**
 * Origin của backend, chuẩn hoá một lần cho cả axios và phần ghép URL ảnh.
 *
 * Chấp nhận cả dạng có scheme (`https://api.example.com`) và dạng chỉ hostname
 * (`api.example.com`) — Render Blueprint truyền host qua `fromService` mà không
 * kèm scheme, và không muốn người deploy phải nhớ tự thêm `https://`.
 *
 * Rỗng nghĩa là gọi cùng origin: dev có Vite proxy, production thì đặt sau
 * cùng một domain.
 */
const raw = (import.meta.env.VITE_API_URL ?? '').trim();

export const API_ORIGIN = raw
  ? (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).replace(/\/+$/, '')
  : '';
