import type {
  Banner,
  Category,
  Product,
  ProductDetail,
  UploadedImage,
} from '@/types';
import { api, unwrap, unwrapPage } from './axios';
import { cleanParams as clean } from './queryParams';

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  isNew?: boolean;
  isSale?: boolean;
  isBest?: boolean;
  all?: boolean;
}

export const productApi = {
  list: (query: ProductQuery = {}) =>
    api.get('/products', { params: clean(query) }).then(unwrapPage<Product>),

  detail: (slug: string) => api.get(`/products/${slug}`).then(unwrap<ProductDetail>),

  adminDetail: (id: number) => api.get(`/products/admin/${id}`).then(unwrap<ProductDetail>),

  related: (id: number) => api.get(`/products/${id}/related`).then(unwrap<Product[]>),

  create: (body: unknown) => api.post('/products', body).then(unwrap<ProductDetail>),

  update: (id: number, body: unknown) =>
    api.put(`/products/${id}`, body).then(unwrap<ProductDetail>),

  remove: (id: number) => api.delete(`/products/${id}`).then(unwrap<null>),
};

export const categoryApi = {
  list: (params: { activeOnly?: boolean } = {}) =>
    api.get('/categories', { params: clean(params) }).then(unwrap<Category[]>),

  tree: (includeHidden = false) =>
    api.get('/categories/tree', { params: clean({ all: includeHidden }) }).then(unwrap<Category[]>),

  detail: (id: number) => api.get(`/categories/${id}`).then(unwrap<Category>),

  create: (body: unknown) => api.post('/categories', body).then(unwrap<Category>),

  update: (id: number, body: unknown) => api.put(`/categories/${id}`, body).then(unwrap<Category>),

  remove: (id: number) => api.delete(`/categories/${id}`).then(unwrap<null>),
};

export const bannerApi = {
  list: (includeHidden = false) =>
    api.get('/banners', { params: clean({ all: includeHidden }) }).then(unwrap<Banner[]>),

  detail: (id: number) => api.get(`/banners/${id}`).then(unwrap<Banner>),

  create: (body: unknown) => api.post('/banners', body).then(unwrap<Banner>),

  update: (id: number, body: unknown) => api.put(`/banners/${id}`, body).then(unwrap<Banner>),

  remove: (id: number) => api.delete(`/banners/${id}`).then(unwrap<null>),
};

export const uploadApi = {
  single: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post('/upload', form).then(unwrap<UploadedImage>);
  },

  multiple: (files: File[]) => {
    const form = new FormData();
    files.forEach((file) => form.append('files', file));
    return api.post('/upload/multiple', form).then(unwrap<UploadedImage[]>);
  },
};
