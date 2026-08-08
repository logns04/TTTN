import { z } from 'zod';
import { booleanish, optionalBooleanQuery, optionalText } from '../../utils/zod';

export const bannerBodySchema = z.object({
  title: z.string().trim().min(2, 'Tiêu đề tối thiểu 2 ký tự').max(200),
  image: z.string().trim().min(1, 'Cần chọn ảnh banner').max(400),
  link: optionalText(400),
  status: booleanish.optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
});

export const bannerListQuerySchema = z.object({
  /** Admin: lấy cả banner đang tắt. */
  all: optionalBooleanQuery,
});

export type BannerBody = z.infer<typeof bannerBodySchema>;
