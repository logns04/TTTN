import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { idParam } from '../../utils/zod';
import * as controller from './controller';
import { addItemSchema, updateItemSchema } from './schema';

export const cartRouter = Router();

// Theo spec mục 3.8: phải đăng nhập mới có giỏ hàng. Không có giỏ hàng cho
// khách vô danh, nên không cần xử lý merge localStorage.
cartRouter.use(requireAuth);

cartRouter.get('/', controller.get);
cartRouter.post('/items', validate({ body: addItemSchema }), controller.addItem);
cartRouter.put(
  '/items/:id',
  validate({ params: idParam, body: updateItemSchema }),
  controller.updateItem,
);
cartRouter.delete('/items/:id', validate({ params: idParam }), controller.removeItem);
cartRouter.delete('/', controller.clear);
