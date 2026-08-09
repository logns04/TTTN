import { SettingType } from '@prisma/client';

export interface SettingDefinition {
  key: string;
  value: string;
  type: SettingType;
  label: string;
}

/**
 * Nguồn sự thật duy nhất cho các khoá cấu hình giao diện.
 *
 * Dùng ở ba nơi: seed tạo giá trị mặc định, `PUT /api/settings` chỉ nhận đúng
 * các khoá này, và trang "Quản lý giao diện" ở admin render form từ đây.
 * Thêm khoá mới chỉ cần thêm một dòng ở file này.
 */
export const SETTING_DEFS: SettingDefinition[] = [
  { key: 'siteName', value: 'Nội Thất Thành Long', type: SettingType.TEXT, label: 'Tên website' },
  { key: 'logo', value: '', type: SettingType.IMAGE, label: 'Logo' },
  { key: 'primaryColor', value: '#8B5E3C', type: SettingType.COLOR, label: 'Màu nhấn' },
  { key: 'hotline', value: '1900 6789', type: SettingType.TEXT, label: 'Hotline' },
  { key: 'email', value: 'lienhe@noithatanvien.vn', type: SettingType.TEXT, label: 'Email liên hệ' },
  {
    key: 'address',
    value: 'Quận 7, TP.HCM',
    type: SettingType.TEXT,
    label: 'Địa chỉ',
  },
  { key: 'homeBanner', value: '', type: SettingType.IMAGE, label: 'Banner trang chủ' },
  {
    key: 'showNewProducts',
    value: 'true',
    type: SettingType.BOOLEAN,
    label: 'Hiện mục "Sản phẩm mới"',
  },
  {
    key: 'showBestProducts',
    value: 'true',
    type: SettingType.BOOLEAN,
    label: 'Hiện mục "Bán chạy"',
  },
  {
    key: 'showSaleProducts',
    value: 'true',
    type: SettingType.BOOLEAN,
    label: 'Hiện mục "Giảm giá"',
  },
  { key: 'showNews', value: 'true', type: SettingType.BOOLEAN, label: 'Hiện mục "Tin tức"' },
];

export const SETTING_KEYS = SETTING_DEFS.map((definition) => definition.key);

export const isKnownSettingKey = (key: string): boolean => SETTING_KEYS.includes(key);
