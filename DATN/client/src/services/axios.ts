import axios, { type AxiosResponse } from 'axios';
import { API_ORIGIN } from '@/lib/apiOrigin';
import type { ApiEnvelope, PageMeta } from '@/types';

const TOKEN_KEY = 'noithat_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  timeout: 20_000,
});

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let unauthorizedHandler: (() => void) | null = null;
export const setUnauthorizedHandler = (handler: () => void) => {
  unauthorizedHandler = handler;
};

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {

    if (axios.isAxiosError(error) && error.response?.status === 401 && tokenStore.get()) {
      tokenStore.clear();
      unauthorizedHandler?.();
    }
    return Promise.reject(error);
  },
);

export const unwrap = <T>(response: AxiosResponse<ApiEnvelope<T>>): T => response.data.data;

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
