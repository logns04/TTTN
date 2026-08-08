import {
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Palette,
  ShoppingBag,
  Store,
  Tags,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROLE_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/slices/authSlice';
import type { Role } from '@/types';

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  /** Role được thấy mục này. Không khai báo = mọi nhân viên. */
  roles?: Role[];
}

/**
 * Sidebar hiện theo role — khớp ma trận quyền ở spec mục 6. Đây chỉ là lớp
 * hiển thị; server vẫn chặn độc lập nếu gọi API trực tiếp.
 */
const NAV_ITEMS: NavItem[] = [
  { to: '/admin', label: 'Tổng quan', icon: LayoutDashboard },
  { to: '/admin/orders', label: 'Đơn hàng', icon: ShoppingBag, roles: ['SUPERADMIN', 'ADMIN'] },
  { to: '/admin/products', label: 'Sản phẩm', icon: Package },
  { to: '/admin/categories', label: 'Danh mục', icon: Tags },
  { to: '/admin/banners', label: 'Banner', icon: ImageIcon },
  { to: '/admin/news', label: 'Tin tức', icon: FileText },
  { to: '/admin/users', label: 'Người dùng', icon: Users, roles: ['SUPERADMIN', 'ADMIN'] },
  { to: '/admin/appearance', label: 'Quản lý giao diện', icon: Palette, roles: ['SUPERADMIN'] },
];

export const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const settings = useAppSelector((state) => state.settings.data);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => setSidebarOpen(false), [location.pathname]);

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role)),
  );

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <Link to="/admin" className="font-display text-base font-bold">
          {settings.siteName}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )
            }
          >
            <item.icon className="size-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <div className="mb-2 px-1">
          <p className="truncate text-sm font-medium">{user?.name}</p>
          {user ? (
            <Badge variant="muted" className="mt-1">
              {ROLE_LABELS[user.role]}
            </Badge>
          ) : null}
        </div>
        <Button variant="outline" size="sm" className="w-full justify-start" asChild>
          <Link to="/">
            <Store />
            Về trang bán hàng
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 w-full justify-start text-destructive"
          onClick={() => dispatch(logout())}
        >
          <LogOut />
          Đăng xuất
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh bg-muted/30">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-card lg:block">
        <div className="sticky top-0 h-dvh">{sidebar}</div>
      </aside>

      {/* Sidebar mobile dạng overlay */}
      {sidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-label="Đóng menu"
          />
          <aside className="absolute left-0 top-0 h-full w-64 border-r border-border bg-card">
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-card/95 px-4 backdrop-blur">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Mở menu"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>

          <p className="font-medium">
            {visibleItems.find((item) =>
              item.to === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.to),
            )?.label ?? 'Quản trị'}
          </p>

          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
