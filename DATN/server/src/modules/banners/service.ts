import { prisma } from '../../config/prisma';
import { notFoundError } from '../../utils/AppError';
import type { BannerBody } from './schema';

const select = {
  id: true,
  title: true,
  image: true,
  link: true,
  status: true,
  sortOrder: true,
  createdAt: true,
} as const;

export const list = (includeHidden = false) =>
  prisma.banner.findMany({
    where: includeHidden ? {} : { status: true },
    select,
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  });

export const getById = async (id: number) => {
  const banner = await prisma.banner.findUnique({ where: { id }, select });
  if (!banner) throw notFoundError('Không tìm thấy banner');
  return banner;
};

const writeData = (body: BannerBody) => ({
  title: body.title,
  image: body.image,
  link: body.link,
  status: body.status ?? true,
  sortOrder: body.sortOrder ?? 0,
});

export const create = (body: BannerBody) =>
  prisma.banner.create({ data: writeData(body), select });

export const update = async (id: number, body: BannerBody) => {
  await getById(id);
  return prisma.banner.update({ where: { id }, data: writeData(body), select });
};

export const remove = async (id: number) => {
  await getById(id);
  await prisma.banner.delete({ where: { id } });
};
