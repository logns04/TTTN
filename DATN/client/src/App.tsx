import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './routes/router';
import { useAppDispatch, useAppSelector } from './store';
import { fetchMe } from './store/slices/authSlice';
import { fetchSettings } from './store/slices/settingsSlice';

export const App = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    // Cấu hình giao diện phải có sớm (logo, tên site, màu nhấn).
    void dispatch(fetchSettings());

    // Có token từ phiên trước thì xác minh lại; hết hạn thì slice tự chuyển về guest.
    if (localStorage.getItem('noithat_token')) void dispatch(fetchMe());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" theme={theme} richColors closeButton />
    </>
  );
};
