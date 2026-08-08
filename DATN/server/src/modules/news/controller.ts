import type { Request, Response } from 'express';
import { created, ok } from '../../utils/apiResponse';
import { unauthorized } from '../../utils/AppError';
import { newsListQuerySchema } from './schema';
import * as service from './service';

export const list = async (req: Request, res: Response) => {
  const query = newsListQuerySchema.parse(req.query);
  const result = await service.list({ ...query, all: query.all && Boolean(req.user) });
  ok(res, result.items, '', result.meta);
};

export const detailBySlug = async (req: Request, res: Response) => {
  ok(res, await service.getBySlug(String(req.params.slug), Boolean(req.user)));
};

export const detailById = async (req: Request, res: Response) => {
  ok(res, await service.getById(Number(req.params.id)));
};

export const create = async (req: Request, res: Response) => {
  if (!req.user) throw unauthorized();
  created(res, await service.create(req.body, req.user.id), 'Đã tạo bài viết');
};

export const update = async (req: Request, res: Response) => {
  ok(res, await service.update(Number(req.params.id), req.body), 'Đã cập nhật bài viết');
};

export const remove = async (req: Request, res: Response) => {
  await service.remove(Number(req.params.id));
  ok(res, null, 'Đã xoá bài viết');
};
