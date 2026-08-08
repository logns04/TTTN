import type { Request, Response } from 'express';
import { storage } from '../../storage';
import { badRequest } from '../../utils/AppError';
import { ok } from '../../utils/apiResponse';

export const uploadSingle = async (req: Request, res: Response) => {
  if (!req.file) throw badRequest('Chưa chọn ảnh nào');
  ok(res, await storage.save(req.file), 'Upload thành công');
};

export const uploadMultiple = async (req: Request, res: Response) => {
  const files = Array.isArray(req.files) ? req.files : [];
  if (files.length === 0) throw badRequest('Chưa chọn ảnh nào');

  const saved = await Promise.all(files.map((file) => storage.save(file)));
  ok(res, saved, `Đã upload ${saved.length} ảnh`);
};
