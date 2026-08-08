import { useEffect, useState } from 'react';

/** Hoãn giá trị lại một nhịp — dùng cho ô tìm kiếm để không gọi API mỗi ký tự. */
export const useDebounce = <T>(value: T, delay = 400): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
