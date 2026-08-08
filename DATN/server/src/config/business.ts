/**
 * Các con số nghiệp vụ dùng ở nhiều nơi (giỏ hàng hiển thị, checkout tính tiền).
 * Để một chỗ để giỏ hàng và đơn hàng không bao giờ lệch nhau.
 */
export const SHIPPING_FEE = 300_000;
export const FREE_SHIPPING_THRESHOLD = 5_000_000;

export const shippingFeeFor = (subtotal: number): number =>
  subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
