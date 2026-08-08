const currency = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

const compact = new Intl.NumberFormat('vi-VN', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const dateTime = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const dateOnly = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const formatCurrency = (value: number) => currency.format(value);

/** 12.900.000đ -> "12,9 Tr" cho nhãn biểu đồ và số liệu tổng. */
export const formatCompact = (value: number) => compact.format(value);

export const formatNumber = (value: number) => value.toLocaleString('vi-VN');

export const formatDateTime = (value: string | Date) => dateTime.format(new Date(value));

export const formatDate = (value: string | Date) => dateOnly.format(new Date(value));

/** Phần trăm giảm giá để hiện badge trên thẻ sản phẩm. */
export const discountPercent = (price: number, salePrice?: number | null): number | null => {
  if (!salePrice || salePrice >= price || price <= 0) return null;
  return Math.round(((price - salePrice) / price) * 100);
};
