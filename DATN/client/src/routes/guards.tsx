import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingBlock } from '@/components/ui/feedback';
import { useAppSelector } from '@/store';
import type { Role } from '@/types';

export const ProtectedRoute = () => {
  const status = useAppSelector((state) => state.auth.status);
  const location = useLocation();

  if (status === 'checking') return <LoadingBlock label="Đang kiểm tra đăng nhập..." />;
  if (status !== 'authenticated') {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return <Outlet />;
};

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
