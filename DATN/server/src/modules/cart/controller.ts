import type { Request, Response } from 'express';
import { unauthorized } from '../../utils/AppError';
import { ok } from '../../utils/apiResponse';
import * as service from './service';

/** Mọi route giỏ hàng đều sau requireAuth, nhưng TS không biết nên kiểm lại. */
const actorId = (req: Request): number => {
  if (!req.user) throw unauthorized();
  return req.user.id;
};

export const get = async (req: Request, res: Response) => {
  ok(res, await service.getCart(actorId(req)));
};

export const addItem = async (req: Request, res: Response) => {
  ok(res, await service.addItem(actorId(req), req.body), 'Đã thêm vào giỏ hàng');
};

export const updateItem = async (req: Request, res: Response) => {
  const result = await service.updateItem(
    actorId(req),
    Number(req.params.id),
    req.body.quantity,
  );
  ok(res, result, 'Đã cập nhật giỏ hàng');
};

export const removeItem = async (req: Request, res: Response) => {
  ok(res, await service.removeItem(actorId(req), Number(req.params.id)), 'Đã xoá khỏi giỏ hàng');
};

export const clear = async (req: Request, res: Response) => {
  ok(res, await service.clear(actorId(req)), 'Đã xoá toàn bộ giỏ hàng');
};
