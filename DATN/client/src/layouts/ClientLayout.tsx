import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Package,
  Phone,
  Search,
  ShoppingCart,
  User as UserIcon,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SafeImage } from '@/components/common/SafeImage';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { categoryApi } from '@/services/catalog.api';
import { useAppDispatch, useAppSelector } from '@/store';
import { isStaff, logout } from '@/store/slices/authSlice';
import { fetchCart } from '@/store/slices/cartSlice';
import type { Category } from '@/types';

const NAV_LINKS = [
  { to: '/', label: 'Trang chủ' },
  { to: '/products', label: 'Sản phẩm' },
  { to: '/news', label: 'Tin tức' },
];

const CategoryMenu = ({ tree }: { tree: Category[] }) => (
  <div className="group relative">
    <button className="flex h-10 items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
      Danh mục
      <ChevronDown className="size-4" />
    </button>

    {}
    <div className="invisible absolute left-0 top-full z-40 w-max opacity-0 transition-all group-hover:visible group-hover:opacity-100">
      <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-border bg-card p-4 shadow-xl lg:grid-cols-4">
        {tree.map((parent) => (
          <div key={parent.id} className="min-w-40">
            <Link
              to={`/products?category=${parent.slug}`}
              className="block text-sm font-semibold hover:text-primary"
            >
              {parent.name}
            </Link>
            <ul className="mt-1.5 space-y-1">
              {parent.children?.map((child) => (
                <li key={child.id}>
                  <Link
                    to={`/products?category=${child.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ClientLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const settings = useAppSelector((state) => state.settings.data);
  const { user, status } = useAppSelector((state) => state.auth);
  const cart = useAppSelector((state) => state.cart.data);

  const [tree, setTree] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    categoryApi.tree().then(setTree).catch(() => setTree([]));
  }, []);
  useEffect(() => {
    if (status === 'authenticated' && !cart) void dispatch(fetchCart());
  }, [status, cart, dispatch]);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const keyword = search.trim();
    navigate(keyword ? `/products?search=${encodeURIComponent(keyword)}` : '/products');
  };

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Thanh thông tin liên hệ */}
      <div className="hidden border-b border-border bg-muted/50 text-xs text-muted-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <div className="flex items-center gap-4">
            {settings.hotline ? (
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5" />
                {settings.hotline}
              </span>
            ) : null}
            {settings.email ? (
              <span className="flex items-center gap-1.5">
                <Mail className="size-3.5" />
                {settings.email}
              </span>
            ) : null}
          </div>
          <span>Miễn phí giao hàng nội thành cho đơn từ 5 triệu</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Mở menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>

          <Link to="/" className="flex shrink-0 items-center gap-2">
            {settings.logo ? (
              <SafeImage
                src={settings.logo}
                alt={settings.siteName}
                className="h-9 w-auto object-contain"
              />
            ) : (
              <span className="font-display text-lg font-bold">{settings.siteName}</span>
            )}
          </Link>

          <nav className="ml-4 hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex h-10 items-center text-sm font-medium transition-colors hover:text-primary',
                    isActive && 'text-primary',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            {tree.length > 0 ? <CategoryMenu tree={tree} /> : null}
          </nav>

          <form onSubmit={submitSearch} className="ml-auto hidden max-w-xs flex-1 md:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm sofa, giường, bàn ăn..."
                className="pl-9"
                aria-label="Tìm sản phẩm"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <ThemeToggle />

            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart" aria-label="Giỏ hàng">
                <ShoppingCart />
                {cart && cart.totalQuantity > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {cart.totalQuantity > 99 ? '99+' : cart.totalQuantity}
                  </span>
                ) : null}
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Tài khoản">
                    <UserIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user.name}
                    <span className="block truncate">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/orders">
                      <Package />
                      Đơn hàng của tôi
                    </Link>
                  </DropdownMenuItem>
                  {isStaff(user.role) ? (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">
                        <LayoutDashboard />
                        Trang quản trị
                      </Link>
                    </DropdownMenuItem>
                  ) : null}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => dispatch(logout())}>
                    <LogOut />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" asChild className="ml-1">
                <Link to="/login">Đăng nhập</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Menu mobile */}
        {mobileOpen ? (
          <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
            <form onSubmit={submitSearch} className="mb-3 md:hidden">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tìm sản phẩm..."
                  className="pl-9"
                />
              </div>
            </form>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-md px-2 py-2 text-sm font-medium hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="mb-1 mt-3 px-2 text-xs font-semibold uppercase text-muted-foreground">
              Danh mục
            </p>
            <div className="grid grid-cols-2 gap-1">
              {tree.map((parent) => (
                <Link
                  key={parent.id}
                  to={`/products?category=${parent.slug}`}
                  className="rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                >
                  {parent.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-lg font-bold">{settings.siteName}</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Nội thất gỗ tự nhiên và gỗ công nghiệp cho phòng khách, phòng ngủ, phòng ăn và
              không gian làm việc. Giao hàng và lắp đặt tại nhà.
            </p>
            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              {settings.address ? <p>{settings.address}</p> : null}
              {settings.hotline ? <p>Hotline: {settings.hotline}</p> : null}
              {settings.email ? <p>Email: {settings.email}</p> : null}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Danh mục</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {tree.slice(0, 6).map((parent) => (
                <li key={parent.id}>
                  <Link to={`/products?category=${parent.slug}`} className="hover:text-primary">
                    {parent.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Hỗ trợ</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>
                <Link to="/products?isSale=true" className="hover:text-primary">
                  Đang giảm giá
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-primary">
                  Tin tức &amp; kinh nghiệm
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-primary">
                  Tra cứu đơn hàng
                </Link>
              </li>
            </ul>
            <Badge variant="muted" className="mt-3">
              Nguyễn Trương Thành Long 221A010028
            </Badge>
          </div>
        </div>

        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {settings.siteName}
        </div>
      </footer>
    </div>
  );
};
