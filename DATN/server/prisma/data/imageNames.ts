import { slugify } from '../../src/utils/slugify';

/** Thư mục con trong public/uploads dành riêng cho ảnh sinh tự động. */
export const SEED_IMAGE_DIR = 'seed';

/**
 * Tên file ảnh phải giống nhau giữa bộ sinh ảnh và seed, nên đặt ở một chỗ
 * duy nhất. Đổi quy ước tên ở đây là cả hai bên đổi theo.
 */
export const categoryImageFile = (name: string) => `cat-${slugify(name)}.svg`;
export const productImageFile = (name: string, index: number) =>
  `prod-${slugify(name)}-${index}.svg`;
export const bannerImageFile = (sortOrder: number) => `banner-${sortOrder}.svg`;
export const newsImageFile = (title: string) => `news-${slugify(title)}.svg`;
export const logoImageFile = () => 'logo.svg';

/** Số ảnh gallery cho mỗi sản phẩm (ảnh 1 dùng luôn làm ảnh đại diện). */
export const PRODUCT_IMAGE_COUNT = 3;
