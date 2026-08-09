import { slugify } from '../../src/utils/slugify';

export const SEED_IMAGE_DIR = 'seed';

export const categoryImageFile = (name: string) => `cat-${slugify(name)}.svg`;
export const productImageFile = (name: string, index: number) =>
  `prod-${slugify(name)}-${index}.svg`;
export const bannerImageFile = (sortOrder: number) => `banner-${sortOrder}.svg`;
export const newsImageFile = (title: string) => `news-${slugify(title)}.svg`;
export const logoImageFile = () => 'logo.svg';
export const PRODUCT_IMAGE_COUNT = 3;
