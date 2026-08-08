import type { IconName } from './icons';

/**
 * Ảnh thật cho dữ liệu mẫu, lấy từ loremflickr theo từ khoá.
 *
 * Vì sao loremflickr: nó trả ảnh Flickr thật khớp từ khoá, không cần API key,
 * và có tham số `lock` để cùng một sản phẩm luôn ra cùng một ảnh giữa các lần
 * seed (nếu không thì mỗi lần tải trang lại đổi ảnh, nhìn như lỗi).
 *
 * Đánh đổi có ý thức: ảnh nằm ở máy chủ bên ngoài nên lúc demo phải có mạng.
 * Đổi lại nhìn ra cửa hàng nội thất thật thay vì hình line-art. Nếu link chết
 * thì SafeImage ở client tự hiện placeholder chứ không vỡ layout.
 */

/** Icon đã có sẵn cho từng món đồ, tái dùng luôn để suy ra từ khoá ảnh. */
const KEYWORDS: Record<IconName, string> = {
  sofa: 'sofa,couch',
  armchair: 'armchair',
  coffeeTable: 'coffee-table',
  tvStand: 'tv-stand,livingroom',
  bed: 'bed,bedroom',
  wardrobe: 'wardrobe,closet',
  nightstand: 'nightstand',
  vanity: 'dressing-table',
  diningTable: 'dining-table',
  chair: 'dining-chair',
  cabinet: 'cabinet,cupboard',
  wineRack: 'wine-rack',
  desk: 'desk,workspace',
  officeChair: 'office-chair',
  bookshelf: 'bookshelf',
  kitchen: 'kitchen,cabinet',
  island: 'kitchen-island',
  spiceRack: 'kitchen,shelf',
  bathVanity: 'bathroom,sink',
  towelRack: 'bathroom,towel',
  gardenSet: 'garden-furniture',
  swing: 'porch-swing',
  lamp: 'lamp,lighting',
  mirror: 'mirror,interior',
  rug: 'rug,carpet',
  picture: 'wall-art,frame',
};

/** Hash ổn định để cùng một tên luôn khoá vào cùng một tấm ảnh. */
const lockFor = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100_000;
  }
  return hash;
};

/**
 * `/all` yêu cầu ảnh khớp mọi từ khoá, `lock` giữ cố định tấm được chọn.
 */
export const photoUrl = (
  icon: IconName,
  seed: string,
  width = 800,
  height = 800,
): string =>
  `https://loremflickr.com/${width}/${height}/${KEYWORDS[icon]}/all?lock=${lockFor(seed)}`;
