import type { Request, Response } from 'express';
import { created, ok } from '../../utils/apiResponse';
import { productListQuerySchema } from './schema';
import * as service from './service';

export const list = async (req: Request, res: Response) => {
  const query = productListQuerySchema.parse(req.query);
  // Chỉ nhân viên mới được xem sản phẩm đang tắt.
  const result = await service.list({ ...query, all: query.all && Boolean(req.user) });
  ok(res, result.items, '', result.meta);
};

export const detailBySlug = async (req: Request, res: Response) => {
  const slug = String(req.params.slug);
  ok(res, await service.getBySlug(slug, Boolean(req.user)));
};

export const detailById = async (req: Request, res: Response) => {
  ok(res, await service.getById(Number(req.params.id)));
};

export const related = async (req: Request, res: Response) => {
  ok(res, await service.related(Number(req.params.id)));
};

export const create = async (req: Request, res: Response) => {
  created(res, await service.create(req.body), 'Đã tạo sản phẩm');
};

export const update = async (req: Request, res: Response) => {
  ok(res, await service.update(Number(req.params.id), req.body), 'Đã cập nhật sản phẩm');
};

export const remove = async (req: Request, res: Response) => {
  await service.remove(Number(req.params.id));
  ok(res, null, 'Đã xoá sản phẩm');
};
