import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

interface ValidateOptions {
  body?: ZodType;
  params?: ZodType;
}

/**
 * Validate body/params trước khi vào controller. Sai thì ZodError được đẩy sang
 * errorHandler và trả 422 kèm danh sách field lỗi.
 *
 * Cố ý KHÔNG validate `query` ở đây: trong Express 5 `req.query` là getter,
 * gán lại sẽ throw. Các endpoint danh sách tự parse query bằng Zod trong
 * controller — vừa hợp lệ vừa có kiểu trả về đúng để dùng tiếp.
 */
export const validate = (options: ValidateOptions): RequestHandler => {
  return (req, _res, next) => {
    try {
      if (options.body) req.body = options.body.parse(req.body);
      if (options.params) {
        Object.assign(req.params, options.params.parse(req.params));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
