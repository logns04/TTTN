import type { OrderStatus, Role } from '@/types';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Chờ xác nhận',
  CONFIRMED: 'Đã xác nhận',
  SHIPPING: 'Đang giao',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã huỷ',
};

export const ORDER_STATUS_CLASSES: Record<OrderStatus, string> = {
  PENDING: 'bg-warning/15 text-warning border-warning/30',
  CONFIRMED: 'bg-primary/15 text-primary border-primary/30',
  SHIPPING: 'bg-accent text-accent-foreground border-border',
  COMPLETED: 'bg-success/15 text-success border-success/30',
  CANCELLED: 'bg-destructive/15 text-destructive border-destructive/30',
};

export const NEXT_ORDER_STATUSES: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['SHIPPING', 'CANCELLED'],
  SHIPPING: ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: [],
};

export const ROLE_LABELS: Record<Role, string> = {
  SUPERADMIN: 'Admin',
  ADMIN: 'Quản Lý',
  EDITOR: 'Nhân Viên',
  USER: 'Khách hàng',
};

export const PAYMENT_LABELS = {
  COD: 'Thanh toán khi nhận hàng (COD)',
  BANK_TRANSFER: 'Chuyển khoản ngân hàng',
} as const;

export const PRODUCT_SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'popular', label: 'Xem nhiều' },
  { value: 'price_asc', label: 'Giá thấp đến cao' },
  { value: 'price_desc', label: 'Giá cao đến thấp' },
  { value: 'name_asc', label: 'Tên A → Z' },
  { value: 'name_desc', label: 'Tên Z → A' },
] as const;

export const PRICE_RANGES = [
  { label: 'Dưới 2 triệu', min: 0, max: 2_000_000 },
  { label: '2 – 5 triệu', min: 2_000_000, max: 5_000_000 },
  { label: '5 – 10 triệu', min: 5_000_000, max: 10_000_000 },
  { label: '10 – 20 triệu', min: 10_000_000, max: 20_000_000 },
  { label: 'Trên 20 triệu', min: 20_000_000, max: undefined },
] as const;

export const FREE_SHIPPING_THRESHOLD = 5_000_000;
