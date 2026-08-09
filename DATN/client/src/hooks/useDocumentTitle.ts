import { useEffect } from 'react';
import { useAppSelector } from '@/store';


export const useDocumentTitle = (title?: string) => {
  const siteName = useAppSelector((state) => state.settings.data.siteName);

  useEffect(() => {
    document.title = title ? `${title} · ${siteName}` : siteName;
  }, [title, siteName]);
};
