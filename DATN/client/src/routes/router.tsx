import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingBlock } from '@/components/ui/feedback';
import { ClientLayout } from '@/layouts/ClientLayout';
import { CartPage } from '@/pages/client/Cart';
import { CheckoutPage } from '@/pages/client/Checkout';
import { HomePage } from '@/pages/client/Home';
import { LoginPage } from '@/pages/client/Login';
import { MyOrdersPage } from '@/pages/client/MyOrders';
import { NewsPage } from '@/pages/client/News';
import { NewsDetailPage } from '@/pages/client/NewsDetail';
import { NotFoundPage } from '@/pages/client/NotFound';
import { ProductDetailPage } from '@/pages/client/ProductDetail';
import { ProductsPage } from '@/pages/client/Products';
import { RegisterPage } from '@/pages/client/Register';
import { ProtectedRoute, RoleRoute } from './guards';

/**
 * Khu vực admin tải chậm (lazy).
 *
 * Recharts và TipTap chỉ dùng ở admin nhưng lại là hai thư viện nặng nhất. Nếu
 * gộp vào bundle chính thì khách vào xem sản phẩm cũng phải tải chúng — vô ích,
 * và đáng kể trên mạng chậm hoặc hosting free.
 */
const AdminLayout = lazy(() =>
  import('@/layouts/AdminLayout').then((m) => ({ default: m.AdminLayout })),
);
const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/Dashboard').then((m) => ({ default: m.AdminDashboardPage })),
);
const AdminProductsPage = lazy(() =>
  import('@/pages/admin/Products').then((m) => ({ default: m.AdminProductsPage })),
);
const AdminCategoriesPage = lazy(() =>
  import('@/pages/admin/Categories').then((m) => ({ default: m.AdminCategoriesPage })),
);
const AdminBannersPage = lazy(() =>
  import('@/pages/admin/Banners').then((m) => ({ default: m.AdminBannersPage })),
);
const AdminNewsPage = lazy(() =>
  import('@/pages/admin/News').then((m) => ({ default: m.AdminNewsPage })),
);
const AdminOrdersPage = lazy(() =>
  import('@/pages/admin/Orders').then((m) => ({ default: m.AdminOrdersPage })),
);
const AdminUsersPage = lazy(() =>
  import('@/pages/admin/Users').then((m) => ({ default: m.AdminUsersPage })),
);
const AdminAppearancePage = lazy(() =>
  import('@/pages/admin/Appearance').then((m) => ({ default: m.AdminAppearancePage })),
);

const STAFF = ['SUPERADMIN', 'ADMIN', 'EDITOR'] as const;
const ADMIN = ['SUPERADMIN', 'ADMIN'] as const;

export const router = createBrowserRouter([
  // Khu vực quản trị. Đặt trước để '/admin' không bị route '*' của client bắt.
  {
    path: 'admin',
    element: <RoleRoute roles={[...STAFF]} />,
    children: [
      {
        element: (
          <Suspense fallback={<LoadingBlock label="Đang tải khu vực quản trị..." />}>
            <AdminLayout />
          </Suspense>
        ),
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'products', element: <AdminProductsPage /> },
          { path: 'categories', element: <AdminCategoriesPage /> },
          { path: 'banners', element: <AdminBannersPage /> },
          { path: 'news', element: <AdminNewsPage /> },

          // Đơn hàng và người dùng: EDITOR không được vào.
          {
            path: 'orders',
            element: <RoleRoute roles={[...ADMIN]} />,
            children: [{ index: true, element: <AdminOrdersPage /> }],
          },
          {
            path: 'users',
            element: <RoleRoute roles={[...ADMIN]} />,
            children: [{ index: true, element: <AdminUsersPage /> }],
          },

          // Quản lý giao diện: chỉ SUPERADMIN.
          {
            path: 'appearance',
            element: <RoleRoute roles={['SUPERADMIN']} />,
            children: [{ index: true, element: <AdminAppearancePage /> }],
          },

          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },

  // Khu vực bán hàng
  {
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:slug', element: <NewsDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },

      // Giỏ hàng, đặt hàng và đơn hàng đều cần đăng nhập.
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'cart', element: <CartPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'orders', element: <MyOrdersPage /> },
        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
