import type { ErrorRequestHandler, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/AppError';
import { isProduction } from '../config/env';

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    data: null,
    message: `Không tìm thấy route ${req.method} ${req.originalUrl}`,
  });
};

const fail = (
  res: Response,
  status: number,
  message: string,
  errors?: unknown,
) =>
  res.status(status).json({
    success: false,
    data: null,
    message,
    ...(errors ? { errors } : {}),
  });
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return fail(res, 422, 'Dữ liệu không hợp lệ', errors);
  }

  if (err instanceof AppError) {
    return fail(res, err.statusCode, err.message, err.details);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = err.meta?.target;
      const field = Array.isArray(target) ? target.join(', ') : String(target ?? '');
      return fail(res, 409, `Giá trị đã tồn tại${field ? `: ${field}` : ''}`);
    }
    if (err.code === 'P2025') {
      return fail(res, 404, 'Không tìm thấy dữ liệu');
    }
    if (err.code === 'P2003') {
      return fail(
        res,
        409,
        'Dữ liệu đang được tham chiếu ở nơi khác, không thể thao tác',
      );
    }
  }
  if (err instanceof SyntaxError && 'body' in err) {
    return fail(res, 400, 'Body JSON không hợp lệ');
  }

  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code?: string }).code;
    if (code === 'LIMIT_FILE_SIZE') {
      return fail(res, 413, 'Ảnh vượt quá 5MB');
    }
    if (code === 'LIMIT_UNEXPECTED_FILE') {
      return fail(res, 400, 'Tên field upload không đúng');
    }
  }
  if (err && typeof err === 'object' && 'statusCode' in err) {
    const status = Number((err as { statusCode?: unknown }).statusCode);
    if (Number.isInteger(status) && status >= 400 && status < 500) {
      return fail(res, status, 'Yêu cầu không hợp lệ');
    }
  }

  console.error('[unhandled]', err);
  return fail(
    res,
    500,
    'Lỗi hệ thống, vui lòng thử lại',
    isProduction ? undefined : { detail: String(err) },
  );
};
