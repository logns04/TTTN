import { Prisma, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '../../config/prisma';
import { badRequest, conflict, notFoundError } from '../../utils/AppError';
import { buildMeta, parsePagination } from '../../utils/pagination';
import type { UserCreateInput, UserListQuery, UserUpdateInput } from './schema';

const select = {
  id: true,
  name: true,
  email: true,
  role: true,
  phone: true,
  address: true,
  avatar: true,
  isActive: true,
  createdAt: true,
  _count: { select: { orders: true } },
} as const;

export const list = async (query: UserListQuery) => {
  const { page, limit, skip, take } = parsePagination(query, 10);

  const where: Prisma.UserWhereInput = {};
  if (query.role) where.role = query.role as Role;
  if (query.search) {
    where.OR = [
      { name: { contains: query.search } },
      { email: { contains: query.search } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.user.findMany({ where, select, orderBy: [{ id: 'asc' }], skip, take }),
    prisma.user.count({ where }),
  ]);

  return { items, meta: buildMeta(total, page, limit) };
};

export const getById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id }, select });
  if (!user) throw notFoundError('Không tìm thấy người dùng');
  return user;
};


const assertNotLastSuperadmin = async (userId: number) => {
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  if (target?.role !== Role.SUPERADMIN) return;

  const count = await prisma.user.count({
    where: { role: Role.SUPERADMIN, isActive: true },
  });
  if (count <= 1) {
    throw badRequest('Đây là SUPERADMIN cuối cùng, không thể hạ quyền hoặc xoá');
  }
};

export const create = async (input: UserCreateInput) => {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw conflict('Email này đã được sử dụng');

  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: await bcrypt.hash(input.password, 10),
      role: input.role as Role,
      phone: input.phone,
      address: input.address,
      isActive: input.isActive ?? true,
    },
    select,
  });
};

export const update = async (id: number, input: UserUpdateInput, actorId: number) => {
  const current = await prisma.user.findUnique({
    where: { id },
    select: { id: true, role: true },
  });
  if (!current) throw notFoundError('Không tìm thấy người dùng');

  const roleChanged = current.role !== input.role;
  const deactivating = input.isActive === false;

  if (id === actorId && roleChanged) {
    throw badRequest('Không thể tự thay đổi vai trò của chính mình');
  }
  if (id === actorId && deactivating) {
    throw badRequest('Không thể tự khoá tài khoản của chính mình');
  }
  if (roleChanged || deactivating) {
    await assertNotLastSuperadmin(id);
  }

  const duplicate = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });
  if (duplicate && duplicate.id !== id) throw conflict('Email này đã được sử dụng');

  return prisma.user.update({
    where: { id },
    data: {
      name: input.name,
      email: input.email,
      role: input.role as Role,
      phone: input.phone,
      address: input.address,
      isActive: input.isActive ?? true,

      ...(input.password ? { password: await bcrypt.hash(input.password, 10) } : {}),
    },
    select,
  });
};

export const remove = async (id: number, actorId: number) => {
  if (id === actorId) throw badRequest('Không thể tự xoá tài khoản của chính mình');

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, _count: { select: { orders: true } } },
  });
  if (!user) throw notFoundError('Không tìm thấy người dùng');

  await assertNotLastSuperadmin(id);

  if (user._count.orders > 0) {
    throw conflict(
      `Người dùng này có ${user._count.orders} đơn hàng nên không thể xoá. Hãy khoá tài khoản thay vì xoá.`,
    );
  }

  await prisma.user.delete({ where: { id } });
};
