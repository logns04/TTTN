import type { Request, Response } from 'express';
import { ok } from '../../utils/apiResponse';
import * as service from './service';

export const getPublic = async (_req: Request, res: Response) => {
  ok(res, await service.getPublic());
};

export const getForAdmin = async (_req: Request, res: Response) => {
  ok(res, await service.getForAdmin());
};

export const update = async (req: Request, res: Response) => {
  ok(res, await service.updateMany(req.body), 'Đã lưu cấu hình giao diện');
};
