import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingBlock } from '@/components/ui/feedback';
import { useAppSelector } from '@/store';
import type { Role } from '@/types';

/**
 * Chặn khi chưa đăng nhập. Giữ lại đường dẫn đang muốn vào trong state để sau
 * khi đăng nhập quay lại đúng chỗ, thay vì luôn về trang chủ.
 */
export const ProtectedRoute = () => {
  const status = useAppSelector((state) => state.auth.status);
  const location = useLocation();

  if (status === 'checking') return <LoadingBlock label="Đang kiểm tra đăng nhập..." />;
  if (status !== 'authenticated') {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return <Outlet />;
};

/** Chặn theo role. Đăng nhập rồi nhưng sai quyền thì về trang chủ. */
export const RoleRoute = ({ roles }: { roles: Role[] }) => {
  const { status, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (status === 'checking') return <LoadingBlock label="Đang kiểm tra quyền..." />;
  if (status !== 'authenticated' || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};
