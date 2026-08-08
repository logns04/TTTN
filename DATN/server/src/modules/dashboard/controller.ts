import type { Request, Response } from 'express';
import { ok } from '../../utils/apiResponse';
import * as service from './service';

export const stats = async (_req: Request, res: Response) => {
  ok(res, await service.stats());
};

export const revenue = async (req: Request, res: Response) => {
  const parsed = Number(req.query.year);
  const year =
    Number.isInteger(parsed) && parsed >= 2000 && parsed <= 2100
      ? parsed
      : new Date().getFullYear();

  ok(res, { year, months: await service.revenueByMonth(year) });
};

export const orderStatus = async (_req: Request, res: Response) => {
  ok(res, await service.ordersByStatus());
};

export const topProducts = async (_req: Request, res: Response) => {
  ok(res, await service.topProducts());
};

export const productsByCategory = async (_req: Request, res: Response) => {
  ok(res, await service.productsByCategory());
};
