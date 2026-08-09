import { prisma } from '../../config/prisma';
import { badRequest, conflict, notFoundError } from '../../utils/AppError';
import { uniqueSlug } from '../../utils/slugify';
import type { CategoryBody, CategoryListQuery } from './schema';

const baseSelect = {
  id: true,
  parentId: true,
  name: true,
  slug: true,
  description: true,
  image: true,
  status: true,
  sortOrder: true,
} as const;

const slugTaken = (excludeId?: number) => async (slug: string) => {
  const found = await prisma.category.findUnique({ where: { slug }, select: { id: true } });
  return found ? found.id !== excludeId : false;
};

const assertValidParent = async (parentId: number | null, selfId?: number) => {
  if (parentId == null) return;
  if (parentId === selfId) throw badRequest('Danh mục không thể là cha của chính nó');

  const parent = await prisma.category.findUnique({
    where: { id: parentId },
    select: { id: true, parentId: true },
  });
  if (!parent) throw badRequest('Danh mục cha không tồn tại');
  if (parent.parentId !== null) {
    throw badRequest('Chỉ hỗ trợ danh mục 2 cấp, không thể tạo cấp thứ ba');
  }

  if (selfId) {
    const childCount = await prisma.category.count({ where: { parentId: selfId } });
    if (childCount > 0) {
      throw badRequest(
        'Danh mục này đang có danh mục con nên không thể chuyển thành danh mục con',
      );
    }
  }
};

export const list = async (query: CategoryListQuery) => {
  const where = query.activeOnly ? { status: true } : {};

  const categories = await prisma.category.findMany({
    where,
    select: {
      ...baseSelect,
      parent: { select: { id: true, name: true, slug: true } },
      _count: { select: { products: true, children: true } },
    },
    orderBy: [{ parentId: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
  });

  return categories;
};

export const tree = async (activeOnly = true) => {
  const where = activeOnly ? { status: true } : {};

  return prisma.category.findMany({
    where: { ...where, parentId: null },
    select: {
      ...baseSelect,
      children: {
        where,
        select: { ...baseSelect, _count: { select: { products: true } } },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });
};

export const getById = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
    select: { ...baseSelect, parent: { select: { id: true, name: true } } },
  });
  if (!category) throw notFoundError('Không tìm thấy danh mục');
  return category;
};

export const create = async (body: CategoryBody) => {
  const parentId = body.parentId ?? null;
  await assertValidParent(parentId);

  return prisma.category.create({
    data: {
      name: body.name,
      slug: await uniqueSlug(body.name, slugTaken()),
      parentId,
      description: body.description,
      image: body.image,
      status: body.status ?? true,
      sortOrder: body.sortOrder ?? 0,
    },
    select: baseSelect,
  });
};

export const update = async (id: number, body: CategoryBody) => {
  const current = await prisma.category.findUnique({
    where: { id },
    select: { id: true, name: true },
  });
  if (!current) throw notFoundError('Không tìm thấy danh mục');

  const parentId = body.parentId ?? null;
  await assertValidParent(parentId, id);

  const slug =
    body.name === current.name ? undefined : await uniqueSlug(body.name, slugTaken(id));

  return prisma.category.update({
    where: { id },
    data: {
      name: body.name,
      ...(slug ? { slug } : {}),
      parentId,
      description: body.description,
      image: body.image,
      status: body.status ?? true,
      sortOrder: body.sortOrder ?? 0,
    },
    select: baseSelect,
  });
};

export const remove = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
    select: { id: true, _count: { select: { children: true, products: true } } },
  });
  if (!category) throw notFoundError('Không tìm thấy danh mục');

  if (category._count.children > 0) {
    throw conflict(
      `Danh mục đang có ${category._count.children} danh mục con, hãy xoá hoặc chuyển chúng trước`,
    );
  }
  if (category._count.products > 0) {
    throw conflict(
      `Danh mục đang có ${category._count.products} sản phẩm, hãy chuyển sản phẩm sang danh mục khác trước`,
    );
  }

  await prisma.category.delete({ where: { id } });
};

export const resolveCategoryIds = async (
  identifier: string | number,
): Promise<number[]> => {
  const numeric = Number(identifier);
  const where =
    Number.isInteger(numeric) && numeric > 0
      ? { id: numeric }
      : { slug: String(identifier) };

  const category = await prisma.category.findFirst({
    where,
    select: { id: true, children: { select: { id: true } } },
  });
  if (!category) return [];

  return [category.id, ...category.children.map((child) => child.id)];
};
