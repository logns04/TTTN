import { z } from 'zod';
import {
  booleanish,
  optionalBooleanQuery,
  optionalNumberQuery,
  optionalStringQuery,
  optionalText,
} from '../../utils/zod';

export const PRODUCT_SORTS = [
  'newest',
  'oldest',
  'price_asc',
  'price_desc',
  'name_asc',
  'name_desc',
  'popular',
] as const;

export type ProductSort = (typeof PRODUCT_SORTS)[number];

export const productBodySchema = z
  .object({
    name: z.string().trim().min(2, 'Tên sản phẩm tối thiểu 2 ký tự').max(200),
    categoryId: z.coerce.number().int().positive('Vui lòng chọn danh mục'),
    image: z.string().trim().min(1, 'Cần ít nhất một ảnh đại diện').max(400),
    price: z.coerce.number().positive('Giá phải lớn hơn 0').max(999_999_999),
    salePrice: z.coerce
      .number()
      .positive('Giá khuyến mãi phải lớn hơn 0')
      .max(999_999_999)
      .nullish(),
    quantity: z.coerce.number().int().min(0, 'Số lượng không được âm').max(999_999),
    shortDescription: optionalText(500),
    description: optionalText(60_000),
    isNew: booleanish.optional(),
    isSale: booleanish.optional(),
    isBest: booleanish.optional(),
    status: booleanish.optional(),

    images: z.array(z.string().trim().min(1).max(400)).max(8).optional(),
  })
  .refine((data) => data.salePrice == null || data.salePrice < data.price, {
    message: 'Giá khuyến mãi phải nhỏ hơn giá gốc',
    path: ['salePrice'],
  });

export const productListQuerySchema = z.object({
  page: optionalNumberQuery(1),
  limit: optionalNumberQuery(1),
  search: optionalStringQuery(200),
  category: optionalStringQuery(200),
  minPrice: optionalNumberQuery(0),
  maxPrice: optionalNumberQuery(0),
  sort: z.enum(PRODUCT_SORTS).optional(),
  isNew: optionalBooleanQuery,
  isSale: optionalBooleanQuery,
  isBest: optionalBooleanQuery,
  all: optionalBooleanQuery,
});

export type ProductBody = z.infer<typeof productBodySchema>;
export type ProductListQuery = z.infer<typeof productListQuerySchema>;
