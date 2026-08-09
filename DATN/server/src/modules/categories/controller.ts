import type { Request, Response } from 'express';
import { ok, created } from '../../utils/apiResponse';
import { categoryListQuerySchema } from './schema';
import * as service from './service';

export const list = async (req: Request, res: Response) => {
  const query = categoryListQuerySchema.parse(req.query);
  ok(res, await service.list(query));
};

export const tree = async (req: Request, res: Response) => {

  const includeHidden = Boolean(req.user) && req.query.all === 'true';
  ok(res, await service.tree(!includeHidden));
};

export const detail = async (req: Request, res: Response) => {
  ok(res, await service.getById(Number(req.params.id)));
};

export const create = async (req: Request, res: Response) => {
  created(res, await service.create(req.body), 'Đã tạo danh mục');
};

export const update = async (req: Request, res: Response) => {
  ok(res, await service.update(Number(req.params.id), req.body), 'Đã cập nhật danh mục');
};

export const remove = async (req: Request, res: Response) => {
  await service.remove(Number(req.params.id));
  ok(res, null, 'Đã xoá danh mục');
};
