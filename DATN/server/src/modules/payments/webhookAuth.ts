import crypto from 'node:crypto';
import type { RequestHandler } from 'express';
import { env } from '../../config/env';
import { AppError, unauthorized } from '../../utils/AppError';

const safeEqual = (a: string, b: string): boolean => {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
};

export const requireSepayApiKey: RequestHandler = (req, _res, next) => {
  const expected = env.SEPAY_WEBHOOK_API_KEY;

  if (!expected) {
    return next(
      new AppError(503, 'Webhook SePay chưa được cấu hình (thiếu SEPAY_WEBHOOK_API_KEY)'),
    );
  }

  const header = req.headers.authorization ?? '';
  const [scheme, key] = header.split(' ');

  if (scheme?.toLowerCase() !== 'apikey' || !key || !safeEqual(key, expected)) {
    return next(unauthorized('Khoá webhook không hợp lệ'));
  }

  next();
};
