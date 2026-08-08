const raw = (import.meta.env.VITE_API_URL ?? '').trim();

export const API_ORIGIN = raw
  ? (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).replace(/\/+$/, '')
  : '';
