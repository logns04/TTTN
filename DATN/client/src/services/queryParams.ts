/**
 * Bỏ các giá trị rỗng trước khi gửi làm query string.
 *
 * Nếu gửi nguyên `?search=&minPrice=` thì server nhận chuỗi rỗng, và mọi chỗ
 * ép về số sẽ biến '' thành 0 — bộ lọc sai âm thầm. `false` cũng bị bỏ vì các
 * flag ở đây chỉ có nghĩa khi bật.
 */
export const cleanParams = <T extends object>(query: T): Record<string, string> => {
  const params: Record<string, string> = {};

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '' || value === false) continue;
    params[key] = String(value);
  }

  return params;
};
