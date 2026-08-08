import type { IconName } from './icons';

export interface SubCategorySeed {
  name: string;
  description: string;
  icon: IconName;
}

export interface CategorySeed {
  name: string;
  description: string;
  icon: IconName;
  children: SubCategorySeed[];
}

/** 8 danh mục cha, mỗi cha có các danh mục con. Đúng 2 cấp, không sâu hơn. */
export const CATEGORIES: CategorySeed[] = [
  {
    name: 'Phòng khách',
    description: 'Sofa, bàn trà, kệ TV và ghế thư giãn cho không gian tiếp khách.',
    icon: 'sofa',
    children: [
      { name: 'Sofa', description: 'Sofa băng, sofa góc, sofa đơn.', icon: 'sofa' },
      { name: 'Bàn trà', description: 'Bàn trà mặt đá, mặt gỗ, chân sắt.', icon: 'coffeeTable' },
      { name: 'Kệ TV', description: 'Kệ TV đứng và kệ treo tường.', icon: 'tvStand' },
      { name: 'Ghế thư giãn', description: 'Armchair, ghế bành, ghế đọc sách.', icon: 'armchair' },
    ],
  },
  {
    name: 'Phòng ngủ',
    description: 'Giường, tủ quần áo và nội thất phụ trợ cho phòng ngủ.',
    icon: 'bed',
    children: [
      { name: 'Giường ngủ', description: 'Giường gỗ, giường bọc nỉ, giường tầng.', icon: 'bed' },
      { name: 'Tủ quần áo', description: 'Tủ cánh mở và cánh lùa.', icon: 'wardrobe' },
      { name: 'Tab đầu giường', description: 'Tủ đầu giường nhỏ có ngăn kéo.', icon: 'nightstand' },
      { name: 'Bàn trang điểm', description: 'Bàn trang điểm kèm gương.', icon: 'vanity' },
    ],
  },
  {
    name: 'Phòng ăn',
    description: 'Bàn ăn, ghế ăn, tủ ly và kệ rượu.',
    icon: 'diningTable',
    children: [
      { name: 'Bàn ăn', description: 'Bàn ăn mặt đá, gỗ tự nhiên, bàn tròn xoay.', icon: 'diningTable' },
      { name: 'Ghế ăn', description: 'Ghế ăn bọc nỉ, ghế nhựa, ghế gỗ.', icon: 'chair' },
      { name: 'Tủ ly', description: 'Tủ trưng bày ly, bát đĩa.', icon: 'cabinet' },
      { name: 'Kệ rượu', description: 'Kệ rượu treo tường và đứng.', icon: 'wineRack' },
    ],
  },
  {
    name: 'Phòng làm việc',
    description: 'Bàn làm việc, ghế công thái học và kệ sách.',
    icon: 'desk',
    children: [
      { name: 'Bàn làm việc', description: 'Bàn chữ L, bàn nâng hạ, bàn đơn.', icon: 'desk' },
      { name: 'Ghế công thái học', description: 'Ghế lưới, ghế xoay hỗ trợ cột sống.', icon: 'officeChair' },
      { name: 'Kệ sách', description: 'Kệ sách nhiều tầng và kệ trang trí.', icon: 'bookshelf' },
    ],
  },
  {
    name: 'Nhà bếp',
    description: 'Tủ bếp, đảo bếp và phụ kiện lưu trữ.',
    icon: 'kitchen',
    children: [
      { name: 'Tủ bếp', description: 'Tủ bếp trên dưới theo mét dài.', icon: 'kitchen' },
      { name: 'Đảo bếp', description: 'Đảo bếp mặt đá có ngăn kéo.', icon: 'island' },
      { name: 'Kệ gia vị', description: 'Kệ inox, kệ gỗ đựng gia vị.', icon: 'spiceRack' },
    ],
  },
  {
    name: 'Phòng tắm',
    description: 'Tủ lavabo và phụ kiện phòng tắm chống nước.',
    icon: 'bathVanity',
    children: [
      { name: 'Tủ lavabo', description: 'Tủ chậu rửa chống nước.', icon: 'bathVanity' },
      { name: 'Kệ khăn', description: 'Kệ và thanh treo khăn inox.', icon: 'towelRack' },
    ],
  },
  {
    name: 'Ngoài trời',
    description: 'Nội thất sân vườn, ban công chịu được thời tiết.',
    icon: 'gardenSet',
    children: [
      { name: 'Bàn ghế sân vườn', description: 'Bộ bàn ghế ngoài trời.', icon: 'gardenSet' },
      { name: 'Ghế xích đu', description: 'Xích đu sắt, xích đu có mái che.', icon: 'swing' },
    ],
  },
  {
    name: 'Trang trí',
    description: 'Đèn, gương, thảm và tranh hoàn thiện không gian.',
    icon: 'lamp',
    children: [
      { name: 'Đèn trang trí', description: 'Đèn thả, đèn cây, đèn bàn.', icon: 'lamp' },
      { name: 'Gương', description: 'Gương tròn, gương toàn thân.', icon: 'mirror' },
      { name: 'Thảm', description: 'Thảm trải sàn phòng khách, phòng ngủ.', icon: 'rug' },
      { name: 'Tranh', description: 'Tranh canvas, tranh bộ nhiều tấm.', icon: 'picture' },
    ],
  },
];
