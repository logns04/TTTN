import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { badRequest, notFoundError } from '../../utils/AppError';
import { buildMeta, parsePagination } from '../../utils/pagination';
import { uniqueSlug } from '../../utils/slugify';
import { resolveCategoryIds } from '../categories/service';
import type { ProductBody, ProductListQuery, ProductSort } from './schema';

const listSelect = {
  id: true,
  name: true,
  slug: true,
  image: true,
  price: true,
  salePrice: true,
  effectivePrice: true,
  quantity: true,
  shortDescription: true,
  isNew: true,
  isSale: true,
  isBest: true,
  status: true,
  viewCount: true,
  createdAt: true,
  category: { select: { id: true, name: true, slug: true } },
} as const;

const detailSelect = {
  ...listSelect,
  description: true,
  categoryId: true,
  updatedAt: true,
  images: { select: { id: true, url: true, sortOrder: true }, orderBy: { sortOrder: 'asc' } },
} as const satisfies Prisma.ProductSelect;

const ORDER_BY: Record<ProductSort, Prisma.ProductOrderByWithRelationInput[]> = {
  newest: [{ createdAt: 'desc' }],
  oldest: [{ createdAt: 'asc' }],
  price_asc: [{ effectivePrice: 'asc' }],
  price_desc: [{ effectivePrice: 'desc' }],
  name_asc: [{ name: 'asc' }],
  name_desc: [{ name: 'desc' }],
  popular: [{ viewCount: 'desc' }],
};

const slugTaken = (excludeId?: number) => async (slug: string) => {
  const found = await prisma.product.findUnique({ where: { slug }, select: { id: true } });
  return found ? found.id !== excludeId : false;
};

const assertCategoryExists = async (categoryId: number) => {
  const found = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });
  if (!found) throw badRequest('Danh mục không tồn tại');
};

const buildWhere = async (query: ProductListQuery): Promise<Prisma.ProductWhereInput> => {
  const where: Prisma.ProductWhereInput = {};

  if (!query.all) where.status = true;
  if (query.search) where.name = { contains: query.search };
  if (query.isNew) where.isNew = true;
  if (query.isSale) where.isSale = true;
  if (query.isBest) where.isBest = true;

  if (query.category) {
    const ids = await resolveCategoryIds(query.category);
    where.categoryId = { in: ids.length > 0 ? ids : [-1] };
  }

  if (query.minPrice != null || query.maxPrice != null) {
    where.effectivePrice = {
      ...(query.minPrice != null ? { gte: query.minPrice } : {}),
      ...(query.maxPrice != null ? { lte: query.maxPrice } : {}),
    };
  }

  return where;
};

export const list = async (query: ProductListQuery) => {
  const { page, limit, skip, take } = parsePagination(query, 12);
  const where = await buildWhere(query);

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      select: listSelect,
      orderBy: ORDER_BY[query.sort ?? 'newest'],
      skip,
      take,
    }),
    prisma.product.count({ where }),
  ]);

  return { items, meta: buildMeta(total, page, limit) };
};

export const getBySlug = async (slug: string, includeHidden = false) => {
  const product = await prisma.product.findFirst({
    where: { slug, ...(includeHidden ? {} : { status: true }) },
    select: detailSelect,
  });
  if (!product) throw notFoundError('Không tìm thấy sản phẩm');

  await prisma.product.update({
    where: { id: product.id },
    data: { viewCount: { increment: 1 } },
  });

  return product;
};

export const getById = async (id: number) => {
  const product = await prisma.product.findUnique({ where: { id }, select: detailSelect });
  if (!product) throw notFoundError('Không tìm thấy sản phẩm');
  return product;
};

export const related = async (id: number, take = 8) => {
  const product = await prisma.product.findUnique({
    where: { id },
    select: { categoryId: true },
  });
  if (!product) throw notFoundError('Không tìm thấy sản phẩm');

  return prisma.product.findMany({
    where: { categoryId: product.categoryId, status: true, id: { not: id } },
    select: listSelect,
    orderBy: [{ viewCount: 'desc' }],
    take,
  });
};

const galleryFrom = (body: ProductBody): string[] => {
  const urls = [body.image, ...(body.images ?? [])];
  return [...new Set(urls)].slice(0, 8);
};

const writeData = (body: ProductBody) => ({
  name: body.name,
  categoryId: body.categoryId,
  image: body.image,
  price: body.price,
  salePrice: body.salePrice ?? null,
  effectivePrice: body.salePrice ?? body.price,
  quantity: body.quantity,
  shortDescription: body.shortDescription,
  description: body.description,
  isNew: body.isNew ?? false,
  isSale: body.isSale ?? false,
  isBest: body.isBest ?? false,
  status: body.status ?? true,
});

export const create = async (body: ProductBody) => {
  await assertCategoryExists(body.categoryId);

  return prisma.product.create({
    data: {
      ...writeData(body),
      slug: await uniqueSlug(body.name, slugTaken()),
      images: {
        create: galleryFrom(body).map((url, index) => ({ url, sortOrder: index })),
      },
    },
    select: detailSelect,
  });
};

export const update = async (id: number, body: ProductBody) => {
  const current = await prisma.product.findUnique({
    where: { id },
    select: { id: true, name: true },
  });
  if (!current) throw notFoundError('Không tìm thấy sản phẩm');
  await assertCategoryExists(body.categoryId);

  const slug =
    body.name === current.name ? undefined : await uniqueSlug(body.name, slugTaken(id));

  return prisma.$transaction(async (tx) => {
    await tx.productImage.deleteMany({ where: { productId: id } });

    return tx.product.update({
      where: { id },
      data: {
        ...writeData(body),
        ...(slug ? { slug } : {}),
        images: {
          create: galleryFrom(body).map((url, index) => ({ url, sortOrder: index })),
        },
      },
      select: detailSelect,
    });
  });
};

export const remove = async (id: number) => {
  const product = await prisma.product.findUnique({ where: { id }, select: { id: true } });
  if (!product) throw notFoundError('Không tìm thấy sản phẩm');
  await prisma.product.delete({ where: { id } });
};
