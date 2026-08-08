import type { OrderStatus } from '@prisma/client';
import type { Request, Response } from 'express';
import { unauthorized } from '../../utils/AppError';
import { created, ok } from '../../utils/apiResponse';
import { orderListQuerySchema } from './schema';
import * as service from './service';

const actor = (req: Request) => {
  if (!req.user) throw unauthorized();
  return req.user;
};

export const checkout = async (req: Request, res: Response) => {
  created(res, await service.checkout(actor(req).id, req.body), 'Đặt hàng thành công');
};

export const listMine = async (req: Request, res: Response) => {
  const query = orderListQuerySchema.parse(req.query);
  const result = await service.list(query, actor(req).id);
  ok(res, result.items, '', result.meta);
};

export const listAll = async (req: Request, res: Response) => {
  const query = orderListQuerySchema.parse(req.query);
  const result = await service.list(query);
  ok(res, result.items, '', result.meta);
};

export const detail = async (req: Request, res: Response) => {
  ok(res, await service.getById(Number(req.params.id), actor(req)));
};

export const updateStatus = async (req: Request, res: Response) => {
  const result = await service.updateStatus(
    Number(req.params.id),
    req.body.status as OrderStatus,
  );
  ok(res, result, 'Đã cập nhật trạng thái đơn hàng');
};
