import type { Request, Response } from 'express';
import { created, ok } from '../../utils/apiResponse';
import { bannerListQuerySchema } from './schema';
import * as service from './service';

export const list = async (req: Request, res: Response) => {
  const query = bannerListQuerySchema.parse(req.query);
  ok(res, await service.list(Boolean(query.all) && Boolean(req.user)));
};

export const detail = async (req: Request, res: Response) => {
  ok(res, await service.getById(Number(req.params.id)));
};

export const create = async (req: Request, res: Response) => {
  created(res, await service.create(req.body), 'Đã tạo banner');
};

export const update = async (req: Request, res: Response) => {
  ok(res, await service.update(Number(req.params.id), req.body), 'Đã cập nhật banner');
};

export const remove = async (req: Request, res: Response) => {
  await service.remove(Number(req.params.id));
  ok(res, null, 'Đã xoá banner');
};
