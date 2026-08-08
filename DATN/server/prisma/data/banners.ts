import type { IconName } from './icons';

export interface BannerSeed {
  title: string;
  headline: string;
  subline: string;
  link: string;
  icon: IconName;
  sortOrder: number;
}

export const BANNERS: BannerSeed[] = [
  {
    title: 'Bộ sưu tập phòng khách 2026',
    headline: 'Phòng khách của bạn, gọn hơn',
    subline: 'Sofa và kệ TV mới — giảm đến 20%',
    link: '/products?category=phong-khach',
    icon: 'sofa',
    sortOrder: 1,
  },
  {
    title: 'Ưu đãi phòng ngủ',
    headline: 'Ngủ ngon bắt đầu từ chiếc giường đúng',
    subline: 'Giường và tủ quần áo — miễn phí lắp đặt',
    link: '/products?category=phong-ngu',
    icon: 'bed',
    sortOrder: 2,
  },
  {
    title: 'Góc làm việc tại nhà',
    headline: 'Làm việc ở nhà, lưng vẫn thẳng',
    subline: 'Bàn nâng hạ và ghế công thái học',
    link: '/products?category=phong-lam-viec',
    icon: 'desk',
    sortOrder: 3,
  },
  {
    title: 'Bàn ăn cho gia đình',
    headline: 'Bữa cơm gia đình xứng đáng một chiếc bàn tử tế',
    subline: 'Bộ bàn ăn từ 7.500.000đ',
    link: '/products?category=phong-an',
    icon: 'diningTable',
    sortOrder: 4,
  },
  {
    title: 'Trang trí hoàn thiện',
    headline: 'Mười phần trăm cuối làm nên căn phòng',
    subline: 'Đèn, gương, thảm và tranh',
    link: '/products?category=trang-tri',
    icon: 'lamp',
    sortOrder: 5,
  },
];
