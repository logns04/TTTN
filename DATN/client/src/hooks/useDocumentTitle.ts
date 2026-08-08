import { useEffect } from 'react';
import { useAppSelector } from '@/store';

/**
 * Đặt tiêu đề tab theo trang. Hậu tố là tên site lấy từ settings nên admin đổi
 * tên website thì tiêu đề tab đổi theo.
 */
export const useDocumentTitle = (title?: string) => {
  const siteName = useAppSelector((state) => state.settings.data.siteName);

  useEffect(() => {
    document.title = title ? `${title} · ${siteName}` : siteName;
  }, [title, siteName]);
};
