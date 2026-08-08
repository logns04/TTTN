import { API_ORIGIN } from './apiOrigin';

export const resolveImageUrl = (url?: string | null): string => {
  if (!url) return '';
  if (/^(https?:)?\/\//i.test(url) || /^(data|blob):/i.test(url)) return url;

  return `${API_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
};
