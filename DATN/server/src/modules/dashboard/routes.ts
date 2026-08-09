import { Router } from 'express';
import { STAFF_ROLES, requireAuth, requireRole } from '../../middleware/auth';
import * as controller from './controller';

export const dashboardRouter = Router();
dashboardRouter.use(requireAuth, requireRole(...STAFF_ROLES));

dashboardRouter.get('/stats', controller.stats);
dashboardRouter.get('/revenue', controller.revenue);
dashboardRouter.get('/order-status', controller.orderStatus);
dashboardRouter.get('/top-products', controller.topProducts);
dashboardRouter.get('/products-by-category', controller.productsByCategory);
