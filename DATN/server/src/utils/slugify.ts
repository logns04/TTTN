// Dải Unicode combining diacritical marks — phần dấu bị tách ra sau khi normalize('NFD').
const COMBINING_MARKS = /[̀-ͯ]/g;

/**
 * "Sofa Băng Gỗ Sồi 3 Chỗ" -> "sofa-bang-go-soi-3-cho"
 * đ/Đ phải xử lý riêng vì trong Unicode nó là ký tự độc lập,
 * không phải "d" cộng thêm dấu, nên NFD không tách được.
 */
export const slugify = (input: string): string => {
  const slug = input
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 180)
    .replace(/^-+|-+$/g, '');

  return slug || 'item';
};

/**
 * Thêm hậu tố -2, -3... cho tới khi slug chưa tồn tại.
 * `exists` do phía gọi truyền vào, nên hàm này không cần biết đang ở bảng nào.
 */
export const uniqueSlug = async (
  source: string,
  exists: (slug: string) => Promise<boolean>,
): Promise<string> => {
  const base = slugify(source);
  let candidate = base;
  let counter = 1;

  while (await exists(candidate)) {
    counter += 1;
    candidate = `${base}-${counter}`;
  }

  return candidate;
};
