import type { Request, Response } from 'express';
import { created, ok } from '../../utils/apiResponse';
import { unauthorized } from '../../utils/AppError';
import { userListQuerySchema } from './schema';
import * as service from './service';

export const list = async (req: Request, res: Response) => {
  const query = userListQuerySchema.parse(req.query);
  const result = await service.list(query);
  ok(res, result.items, '', result.meta);
};

export const detail = async (req: Request, res: Response) => {
  ok(res, await service.getById(Number(req.params.id)));
};

export const create = async (req: Request, res: Response) => {
  created(res, await service.create(req.body), 'Đã tạo người dùng');
};

export const update = async (req: Request, res: Response) => {
  if (!req.user) throw unauthorized();
  ok(
    res,
    await service.update(Number(req.params.id), req.body, req.user.id),
    'Đã cập nhật người dùng',
  );
};

export const remove = async (req: Request, res: Response) => {
  if (!req.user) throw unauthorized();
  await service.remove(Number(req.params.id), req.user.id);
  ok(res, null, 'Đã xoá người dùng');
};
