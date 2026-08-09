import { Role } from '@prisma/client';
import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import type { AuthUser } from '../types/auth';
import { AppError, forbidden, unauthorized } from '../utils/AppError';

export const STAFF_ROLES = [Role.SUPERADMIN, Role.ADMIN, Role.EDITOR] as const;

export const ADMIN_ROLES = [Role.SUPERADMIN, Role.ADMIN] as const;

const readToken = (header?: string): string | null => {
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (!token || scheme?.toLowerCase() !== 'bearer') return null;
  return token;
};

const verify = (token: string): AuthUser => {
  const payload = jwt.verify(token, env.JWT_SECRET);
  if (typeof payload === 'string') throw unauthorized('Token không hợp lệ');

  const { id, name, email, role } = payload as Partial<AuthUser>;
  if (typeof id !== 'number' || !name || !email || !role) {
    throw unauthorized('Token không hợp lệ');
  }

  return { id, name, email, role };
};

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = readToken(req.headers.authorization);
  if (!token) return next(unauthorized('Bạn cần đăng nhập'));

  try {
    req.user = verify(token);
    next();
  } catch (error) {

    next(
      error instanceof AppError
        ? error
        : unauthorized('Token không hợp lệ hoặc đã hết hạn'),
    );
  }
};

export const optionalAuth: RequestHandler = (req, _res, next) => {
  const token = readToken(req.headers.authorization);
  if (token) {
    try {
      req.user = verify(token);
    } catch {

    }
  }
  next();
};

export const requireRole = (...roles: readonly Role[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.user) return next(unauthorized('Bạn cần đăng nhập'));
    if (!roles.includes(req.user.role)) {
      return next(forbidden('Bạn không có quyền thực hiện thao tác này'));
    }
    next();
  };
};
