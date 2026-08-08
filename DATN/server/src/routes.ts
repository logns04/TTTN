import { Router } from 'express';
import { authRouter } from './modules/auth/routes';
import { bannerRouter } from './modules/banners/routes';
import { cartRouter } from './modules/cart/routes';
import { categoryRouter } from './modules/categories/routes';
import { dashboardRouter } from './modules/dashboard/routes';
import { newsRouter } from './modules/news/routes';
import { orderRouter } from './modules/orders/routes';
import { paymentRouter } from './modules/payments/routes';
import { productRouter } from './modules/products/routes';
import { settingsRouter } from './modules/settings/routes';
import { uploadRouter } from './modules/upload/routes';
import { userRouter } from './modules/users/routes';

/**
 * Điểm mount duy nhất cho toàn bộ API. Mỗi module tự khai báo router của nó,
 * ở đây chỉ ghép vào prefix — app.ts không cần biết có bao nhiêu module.
 */
export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: { status: 'ok', time: new Date().toISOString() },
    message: '',
  });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/banners', bannerRouter);
apiRouter.use('/news', newsRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/payments', paymentRouter);
apiRouter.use('/settings', settingsRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/upload', uploadRouter);
