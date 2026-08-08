import { z } from 'zod';
import {
  optionalEmailField,
  optionalNumberQuery,
  optionalStringQuery,
  optionalText,
  phoneField,
} from '../../utils/zod';

export const ORDER_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'SHIPPING',
  'COMPLETED',
  'CANCELLED',
] as const;

export const PAYMENT_METHODS = ['COD', 'BANK_TRANSFER'] as const;

export const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, 'Họ tên tối thiểu 2 ký tự').max(120),
  customerPhone: phoneField,
  customerEmail: optionalEmailField,
  shippingAddress: z
    .string()
    .trim()
    .min(10, 'Địa chỉ giao hàng cần chi tiết hơn (tối thiểu 10 ký tự)')
    .max(400),
  note: optionalText(1000),
  paymentMethod: z.enum(PAYMENT_METHODS).default('COD'),
});

export const updateStatusSchema = z.object({
  status: z.enum(ORDER_STATUSES, { message: 'Trạng thái không hợp lệ' }),
});

export const orderListQuerySchema = z.object({
  page: optionalNumberQuery(1),
  limit: optionalNumberQuery(1),
  /** Tìm theo mã đơn, tên hoặc số điện thoại khách. */
  search: optionalStringQuery(200),
  status: z.enum(ORDER_STATUSES).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type OrderListQuery = z.infer<typeof orderListQuerySchema>;
