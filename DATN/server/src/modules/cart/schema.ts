import { z } from 'zod';

export const addItemSchema = z.object({
  productId: z.coerce.number().int().positive('Sản phẩm không hợp lệ'),
  quantity: z.coerce.number().int().min(1, 'Số lượng tối thiểu là 1').max(99).default(1),
});

export const updateItemSchema = z.object({
  quantity: z.coerce.number().int().min(1, 'Số lượng tối thiểu là 1').max(99),
});

export type AddItemInput = z.infer<typeof addItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
