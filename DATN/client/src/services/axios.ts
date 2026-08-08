import axios, { type AxiosResponse } from 'axios';
import { API_ORIGIN } from '@/lib/apiOrigin';
import type { ApiEnvelope, PageMeta } from '@/types';

const TOKEN_KEY = 'noithat_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

/**
 * Dev: gọi '/api' cùng origin, Vite proxy sang backend nên không cần CORS.
 * Production: đặt VITE_API_URL = origin của backend (ví dụ trên Render).
 */
export const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  timeout: 20_000,
});

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Store đăng ký hàm này lúc khởi tạo. Tránh để services import store (và store
// import services) gây vòng phụ thuộc.
let unauthorizedHandler: (() => void) | null = null;
export const setUnauthorizedHandler = (handler: () => void) => {
  unauthorizedHandler = handler;
};

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // Token hết hạn hoặc bị thu hồi: dọn sạch rồi để store đẩy về /login.
    // Chỉ xử lý khi đang có token, không thì 401 của endpoint public sẽ gây
    // redirect vô cớ.
    if (axios.isAxiosError(error) && error.response?.status === 401 && tokenStore.get()) {
      tokenStore.clear();
      unauthorizedHandler?.();
    }
    return Promise.reject(error);
  },
);

/** Bóc `data` ra khỏi envelope { success, data, message }. */
export const unwrap = <T>(response: AxiosResponse<ApiEnvelope<T>>): T => response.data.data;

/** Dùng cho endpoint có phân trang. */
export const unwrapPage = <T>(
  response: AxiosResponse<ApiEnvelope<T[]>>,
): { items: T[]; meta: PageMeta } => ({
  items: response.data.data,
  meta:
    response.data.meta ?? {
      page: 1,
      limit: response.data.data.length,
      total: response.data.data.length,
      totalPages: 1,
    },
});

/**
 * Lấy message tiếng Việt mà server đã soạn. Lỗi validate trả về mảng field nên
 * gộp lại để người dùng thấy đủ, thay vì chỉ "Dữ liệu không hợp lệ".
 */
export const getErrorMessage = (
  error: unknown,
  fallback = 'Có lỗi xảy ra, vui lòng thử lại',
): string => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as ApiEnvelope<null> | undefined;
    if (payload?.errors?.length) {
      return payload.errors.map((item) => item.message).join('. ');
    }
    if (payload?.message) return payload.message;
    if (error.code === 'ERR_NETWORK') {
      return 'Không kết nối được tới server. Kiểm tra backend đã chạy chưa.';
    }
  }
  return fallback;
};
