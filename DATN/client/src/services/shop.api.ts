import type {
  AdminSetting,
  Cart,
  CategoryCountPoint,
  DashboardStats,
  NewsDetail,
  NewsItem,
  OrderDetail,
  OrderStatus,
  OrderStatusPoint,
  OrderSummary,
  PaymentInfo,
  PublicSettings,
  RevenuePoint,
  TopProductPoint,
  User,
} from '@/types';
import { api, unwrap, unwrapPage } from './axios';
import { cleanParams as clean } from './queryParams';

export const cartApi = {
  get: () => api.get('/cart').then(unwrap<Cart>),
  addItem: (productId: number, quantity = 1) =>
    api.post('/cart/items', { productId, quantity }).then(unwrap<Cart>),
  updateItem: (itemId: number, quantity: number) =>
    api.put(`/cart/items/${itemId}`, { quantity }).then(unwrap<Cart>),
  removeItem: (itemId: number) => api.delete(`/cart/items/${itemId}`).then(unwrap<Cart>),
  clear: () => api.delete('/cart').then(unwrap<Cart>),
};

export interface CheckoutBody {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  note?: string;
  paymentMethod: 'COD' | 'BANK_TRANSFER';
}

export const orderApi = {
  checkout: (body: CheckoutBody) => api.post('/orders', body).then(unwrap<OrderDetail>),

  mine: (query: { page?: number; limit?: number; status?: OrderStatus } = {}) =>
    api.get('/orders/my', { params: clean(query) }).then(unwrapPage<OrderSummary>),

  all: (query: { page?: number; limit?: number; search?: string; status?: OrderStatus } = {}) =>
    api.get('/orders', { params: clean(query) }).then(unwrapPage<OrderSummary>),

  detail: (id: number) => api.get(`/orders/${id}`).then(unwrap<OrderDetail>),

  updateStatus: (id: number, status: OrderStatus) =>
    api.patch(`/orders/${id}/status`, { status }).then(unwrap<OrderDetail>),
};

export const paymentApi = {

  info: (orderId: number) => api.get(`/payments/order/${orderId}`).then(unwrap<PaymentInfo>),
};

export const newsApi = {
  list: (query: { page?: number; limit?: number; search?: string; all?: boolean } = {}) =>
    api.get('/news', { params: clean(query) }).then(unwrapPage<NewsItem>),

  detail: (slug: string) => api.get(`/news/${slug}`).then(unwrap<NewsDetail>),

  adminDetail: (id: number) => api.get(`/news/admin/${id}`).then(unwrap<NewsDetail>),

  create: (body: unknown) => api.post('/news', body).then(unwrap<NewsDetail>),

  update: (id: number, body: unknown) => api.put(`/news/${id}`, body).then(unwrap<NewsDetail>),

  remove: (id: number) => api.delete(`/news/${id}`).then(unwrap<null>),
};

export const userApi = {
  list: (query: { page?: number; limit?: number; search?: string; role?: string } = {}) =>
    api.get('/users', { params: clean(query) }).then(unwrapPage<User>),

  detail: (id: number) => api.get(`/users/${id}`).then(unwrap<User>),

  create: (body: unknown) => api.post('/users', body).then(unwrap<User>),

  update: (id: number, body: unknown) => api.put(`/users/${id}`, body).then(unwrap<User>),

  remove: (id: number) => api.delete(`/users/${id}`).then(unwrap<null>),
};

export const settingsApi = {
  getPublic: () => api.get('/settings').then(unwrap<PublicSettings>),
  getForAdmin: () => api.get('/settings/admin').then(unwrap<AdminSetting[]>),
  update: (body: Record<string, string>) => api.put('/settings', body).then(unwrap<AdminSetting[]>),
};

export const dashboardApi = {
  stats: () => api.get('/dashboard/stats').then(unwrap<DashboardStats>),
  revenue: (year: number) =>
    api
      .get('/dashboard/revenue', { params: { year } })
      .then(unwrap<{ year: number; months: RevenuePoint[] }>),
  orderStatus: () => api.get('/dashboard/order-status').then(unwrap<OrderStatusPoint[]>),
  topProducts: () => api.get('/dashboard/top-products').then(unwrap<TopProductPoint[]>),
  productsByCategory: () =>
    api.get('/dashboard/products-by-category').then(unwrap<CategoryCountPoint[]>),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }).then(unwrap<{ user: User; token: string }>),

  register: (body: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => api.post('/auth/register', body).then(unwrap<{ user: User; token: string }>),

  me: () => api.get('/auth/me').then(unwrap<User>),

  updateProfile: (body: { name: string; phone?: string; address?: string }) =>
    api.put('/auth/me', body).then(unwrap<User>),
};
