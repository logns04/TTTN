import type { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { notFoundError } from '../../utils/AppError';
import { buildMeta, parsePagination } from '../../utils/pagination';
import { uniqueSlug } from '../../utils/slugify';
import type { NewsBody, NewsListQuery } from './schema';

const listSelect = {
  id: true,
  title: true,
  slug: true,
  image: true,
  summary: true,
  publishedAt: true,
  status: true,
  author: { select: { id: true, name: true } },
} as const;

const detailSelect = { ...listSelect, content: true, createdAt: true } as const;

const slugTaken = (excludeId?: number) => async (slug: string) => {
  const found = await prisma.news.findUnique({ where: { slug }, select: { id: true } });
  return found ? found.id !== excludeId : false;
};

export const list = async (query: NewsListQuery) => {
  const { page, limit, skip, take } = parsePagination(query, 9);

  const where: Prisma.NewsWhereInput = {};
  if (!query.all) where.status = true;
  if (query.search) where.title = { contains: query.search };

  const [items, total] = await Promise.all([
    prisma.news.findMany({
      where,
      select: listSelect,
      orderBy: [{ publishedAt: 'desc' }],
      skip,
      take,
    }),
    prisma.news.count({ where }),
  ]);

  return { items, meta: buildMeta(total, page, limit) };
};

export const getBySlug = async (slug: string, includeHidden = false) => {
  const article = await prisma.news.findFirst({
    where: { slug, ...(includeHidden ? {} : { status: true }) },
    select: detailSelect,
  });
  if (!article) throw notFoundError('Không tìm thấy bài viết');
  return article;
};

export const getById = async (id: number) => {
  const article = await prisma.news.findUnique({ where: { id }, select: detailSelect });
  if (!article) throw notFoundError('Không tìm thấy bài viết');
  return article;
};

const writeData = (body: NewsBody) => ({
  title: body.title,
  image: body.image,
  summary: body.summary,
  content: body.content,
  publishedAt: body.publishedAt ?? new Date(),
  status: body.status ?? true,
});

export const create = async (body: NewsBody, authorId: number) =>
  prisma.news.create({
    data: {
      ...writeData(body),
      slug: await uniqueSlug(body.title, slugTaken()),
      authorId,
    },
    select: detailSelect,
  });

export const update = async (id: number, body: NewsBody) => {
  const current = await prisma.news.findUnique({
    where: { id },
    select: { id: true, title: true },
  });
  if (!current) throw notFoundError('Không tìm thấy bài viết');

  const slug =
    body.title === current.title ? undefined : await uniqueSlug(body.title, slugTaken(id));

  return prisma.news.update({
    where: { id },
    data: { ...writeData(body), ...(slug ? { slug } : {}) },
    select: detailSelect,
  });
};

export const remove = async (id: number) => {
  await getById(id);
  await prisma.news.delete({ where: { id } });
};
