import { z } from 'zod';
import {
  booleanish,
  optionalBooleanQuery,
  optionalNumberQuery,
  optionalStringQuery,
  optionalText,
} from '../../utils/zod';

export const newsBodySchema = z.object({
  title: z.string().trim().min(4, 'Tiêu đề tối thiểu 4 ký tự').max(250),
  image: optionalText(400),
  summary: optionalText(500),
  content: z.string().trim().min(10, 'Nội dung tối thiểu 10 ký tự').max(200_000),
  publishedAt: z.coerce.date().optional(),
  status: booleanish.optional(),
});

export const newsListQuerySchema = z.object({
  page: optionalNumberQuery(1),
  limit: optionalNumberQuery(1),
  search: optionalStringQuery(200),
  all: optionalBooleanQuery,
});

export type NewsBody = z.infer<typeof newsBodySchema>;
export type NewsListQuery = z.infer<typeof newsListQuerySchema>;
