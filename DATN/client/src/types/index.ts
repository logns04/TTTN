export type Role = 'SUPERADMIN' | 'ADMIN' | 'EDITOR' | 'USER';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
export type PaymentMethod = 'COD' | 'BANK_TRANSFER';
export type SettingType = 'TEXT' | 'IMAGE' | 'COLOR' | 'BOOLEAN';

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** Hình dạng response chung của toàn bộ API. */
export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: PageMeta;
  errors?: { field: string; message: string }[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  isActive: boolean;
  createdAt: string;
  _count?: { orders: number };
}

export interface CategoryRef {
  id: number;
  name: string;
  slug: string;
}

export interface Category extends CategoryRef {
  parentId: number | null;
  description: string | null;
  image: string | null;
  status: boolean;
  sortOrder: number;
  parent?: CategoryRef | null;
  children?: Category[];
  _count?: { products: number; children?: number };
}

export interface ProductImage {
  id: number;
  url: string;
  sortOrder: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  salePrice: number | null;
  effectivePrice: number;
  quantity: number;
  shortDescription: string | null;
  isNew: boolean;
  isSale: boolean;
  isBest: boolean;
  status: boolean;
  viewCount: number;
  createdAt: string;
  category: CategoryRef;
}

export interface ProductDetail extends Product {
  categoryId: number;
  description: string | null;
  updatedAt: string;
  images: ProductImage[];
}

export interface Banner {
  id: number;
  title: string;
  image: string;
  link: string | null;
  status: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  summary: string | null;
  publishedAt: string;
  status: boolean;
  author: { id: number; name: string } | null;
}

export interface NewsDetail extends NewsItem {
  content: string;
  createdAt: string;
}

export interface CartLine {
  id: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  unavailable: boolean;
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
    salePrice: number | null;
    effectivePrice: number;
    quantity: number;
    status: boolean;
  };
}

export interface Cart {
  id: number;
  items: CartLine[];
  totalQuantity: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  hasUnavailable: boolean;
}

export interface OrderItem {
  id: number;
  productId: number | null;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
  product: { slug: string } | null;
}

export interface OrderSummary {
  id: number;
  code: string;
  customerName: string;
  customerPhone: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;

  paidAt: string | null;
  createdAt: string;
  _count: { items: number };
}

export interface PaymentInfo {
  orderCode: string;
  amount: number;
  paid: boolean;
  paidAt: string | null;
  status: OrderStatus;
  configured: boolean;
  bankAccount: string | null;
  bankCode: string | null;
  accountName: string | null;
  transferContent: string;
  qrUrl: string | null;
}

export interface OrderDetail extends OrderSummary {
  customerEmail: string | null;
  shippingAddress: string;
  note: string | null;
  updatedAt: string;
  userId: number;
  user: { id: number; name: string; email: string } | null;
  items: OrderItem[];
}

export type PublicSettings = Record<string, string>;

export interface AdminSetting {
  key: string;
  label: string;
  type: SettingType;
  value: string;
}

export interface DashboardStats {
  products: number;
  categories: number;
  orders: number;
  users: number;
  revenue: number;
  pendingOrders: number;
  lowStock: number;
}

export interface RevenuePoint {
  month: number;
  label: string;
  revenue: number;
  orders: number;
}

export interface OrderStatusPoint {
  status: OrderStatus;
  label: string;
  count: number;
}

export interface TopProductPoint {
  name: string;
  quantity: number;
  revenue: number;
}

export interface CategoryCountPoint {
  name: string;
  count: number;
}

export interface UploadedImage {
  url: string;
  key: string;
}
