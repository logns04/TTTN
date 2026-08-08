import crypto from 'node:crypto';
import type { RequestHandler } from 'express';
import { env } from '../../config/env';
import { AppError, unauthorized } from '../../utils/AppError';

/**
 * So sánh không phụ thuộc thời gian, tránh rò rỉ khoá qua việc đo thời gian
 * phản hồi. `timingSafeEqual` đòi hai buffer cùng độ dài nên hash trước.
 */
const safeEqual = (a: string, b: string): boolean => {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
};

/**
 * SePay gửi kèm header `Authorization: Apikey <khoá>`.
 *
 * Chưa cấu hình khoá thì từ chối tất cả (fail-closed). Nếu để lọt, bất kỳ ai
 * cũng có thể POST một payload giả và đánh dấu đơn hàng đã thanh toán.
 */
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
