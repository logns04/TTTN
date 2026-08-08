import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { prisma } from '../../config/prisma';
import type { AuthUser } from '../../types/auth';
import { conflict, notFoundError, unauthorized } from '../../utils/AppError';
import type { LoginInput, RegisterInput, UpdateProfileInput } from './schema';

const BCRYPT_ROUNDS = 10;

/** Các field được phép trả ra ngoài — cố ý không có `password`. */
const publicFields = {
  id: true,
  name: true,
  email: true,
  role: true,
  phone: true,
  address: true,
  avatar: true,
  isActive: true,
  createdAt: true,
} as const;

const signToken = (user: AuthUser): string =>
  jwt.sign(user, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });

const toAuthUser = (user: {
  id: number;
  name: string;
  email: string;
  role: Role;
}): AuthUser => ({ id: user.id, name: user.name, email: user.email, role: user.role });

export const register = async (input: RegisterInput) => {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw conflict('Email này đã được sử dụng');

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: await bcrypt.hash(input.password, BCRYPT_ROUNDS),
      phone: input.phone,
      address: input.address,
      // Role cố định USER. Không bao giờ đọc role từ body — nếu không thì ai
      // cũng tự đăng ký được tài khoản SUPERADMIN.
      role: Role.USER,
    },
    select: publicFields,
  });

  return { user, token: signToken(toAuthUser(user)) };
};

export const login = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  // Cùng một message cho "không có email" và "sai mật khẩu" để không giúp
  // người ngoài dò ra email nào đã tồn tại trong hệ thống.
  const invalid = unauthorized('Email hoặc mật khẩu không đúng');
  if (!user) throw invalid;
  if (!(await bcrypt.compare(input.password, user.password))) throw invalid;
  if (!user.isActive) throw unauthorized('Tài khoản đã bị khoá');

  const { password: _password, updatedAt: _updatedAt, ...safe } = user;
  return { user: safe, token: signToken(toAuthUser(user)) };
};

export const getProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: publicFields,
  });
  if (!user) throw notFoundError('Không tìm thấy người dùng');
  return user;
};

export const updateProfile = async (userId: number, input: UpdateProfileInput) =>
  prisma.user.update({
    where: { id: userId },
    data: { name: input.name, phone: input.phone, address: input.address },
    select: publicFields,
  });
