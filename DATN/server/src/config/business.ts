export const SHIPPING_FEE = 300_000;
export const FREE_SHIPPING_THRESHOLD = 5_000_000;

export const shippingFeeFor = (subtotal: number): number =>
  subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
