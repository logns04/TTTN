import { z } from 'zod';
import { booleanish, optionalText } from '../../utils/zod';

export const categoryBodySchema = z.object({
  name: z.string().trim().min(2, 'Tên danh mục tối thiểu 2 ký tự').max(150),
  parentId: z.coerce.number().int().positive().nullable().optional(),
  description: optionalText(2000),
  image: optionalText(400),
  status: booleanish.optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
});

export const categoryListQuerySchema = z.object({
  /** true = danh sách phẳng cho dropdown; mặc định trả kèm thông tin cha. */
  flat: booleanish.optional(),
  /** true = chỉ lấy danh mục đang bật, dùng cho phía client. */
  activeOnly: booleanish.optional(),
});

export type CategoryBody = z.infer<typeof categoryBodySchema>;
export type CategoryListQuery = z.infer<typeof categoryListQuerySchema>;
