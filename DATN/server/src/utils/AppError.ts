export class AppError extends Error {
  readonly statusCode: number;
  readonly details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace?.(this, AppError);
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new AppError(400, message, details);

export const unauthorized = (message = 'Bạn cần đăng nhập') =>
  new AppError(401, message);

export const forbidden = (message = 'Bạn không có quyền thực hiện thao tác này') =>
  new AppError(403, message);

export const notFoundError = (message = 'Không tìm thấy dữ liệu') =>
  new AppError(404, message);

export const conflict = (message: string, details?: unknown) =>
  new AppError(409, message, details);
