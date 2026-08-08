import type { Request, Response } from 'express';
import { created, ok } from '../../utils/apiResponse';
import { unauthorized } from '../../utils/AppError';
import * as service from './service';

export const register = async (req: Request, res: Response) => {
  const result = await service.register(req.body);
  created(res, result, 'Đăng ký thành công');
};

export const login = async (req: Request, res: Response) => {
  const result = await service.login(req.body);
  ok(res, result, 'Đăng nhập thành công');
};

export const me = async (req: Request, res: Response) => {
  if (!req.user) throw unauthorized();
  ok(res, await service.getProfile(req.user.id));
};

export const updateProfile = async (req: Request, res: Response) => {
  if (!req.user) throw unauthorized();
  ok(res, await service.updateProfile(req.user.id, req.body), 'Đã cập nhật thông tin');
};

/**
 * JWT là stateless nên server không có gì để thu hồi — việc đăng xuất thực chất
 * là client xoá token. Endpoint này tồn tại để phía client có một chỗ gọi
 * thống nhất và để log về sau nếu cần.
 */
export const logout = async (_req: Request, res: Response) => {
  ok(res, null, 'Đã đăng xuất');
};
