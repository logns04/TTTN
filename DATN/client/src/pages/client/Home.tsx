import { ArrowRight, ChevronLeft, ChevronRight, Truck, ShieldCheck, Headset } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ProductCard } from '@/components/common/ProductCard';
import { SafeImage } from '@/components/common/SafeImage';
import { Button } from '@/components/ui/button';
import { ProductGridSkeleton } from '@/components/ui/feedback';
import { formatDate } from '@/lib/format';
import { getErrorMessage } from '@/services/axios';
import { bannerApi, categoryApi, productApi } from '@/services/catalog.api';
import { newsApi } from '@/services/shop.api';
import { useAppSelector } from '@/store';
import { isEnabled } from '@/store/slices/settingsSlice';
import type { Banner, Category, NewsItem, Product } from '@/types';
import { useAddToCart } from './useAddToCart';

const BannerSlider = ({ banners }: { banners: Banner[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % banners.length), 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;
  const current = banners[index]!;

  const go = (step: number) =>
    setIndex((value) => (value + step + banners.length) % banners.length);

  return (
    <section className="relative overflow-hidden bg-muted">
      <Link to={current.link ?? '/products'} className="block">
        <SafeImage
          src={current.image}
          alt={current.title}
          className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[420px]"
        />
      </Link>

      {banners.length > 1 ? (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
            onClick={() => go(-1)}
            aria-label="Banner trước"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
            onClick={() => go(1)}
            aria-label="Banner sau"
          >
            <ChevronRight />
          </Button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {banners.map((banner, position) => (
              <button
                key={banner.id}
                onClick={() => setIndex(position)}
                aria-label={`Banner ${position + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  position === index ? 'w-6 bg-primary' : 'w-1.5 bg-foreground/30'
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
};

const SectionHeader = ({
  title,
  description,
  to,
}: {
  title: string;
  description?: string;
  to: string;
}) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
    <div>
      <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
    <Button variant="link" asChild className="px-0">
      <Link to={to}>
        Xem tất cả
        <ArrowRight />
      </Link>
    </Button>
  </div>
);

const ProductSection = ({
  title,
  description,
  to,
  products,
  loading,
  onAddToCart,
  adding,
}: {
  title: string;
  description?: string;
  to: string;
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
  adding: boolean;
}) => {
  if (!loading && products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <SectionHeader title={title} description={description} to={to} />
      {loading ? (
        <ProductGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              adding={adding}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const countProducts = (category: Category): number =>
  (category._count?.products ?? 0) +
  (category.children ?? []).reduce((sum, child) => sum + (child._count?.products ?? 0), 0);

const TRUST_ITEMS = [
  { icon: Truck, title: 'Giao hàng & lắp đặt', text: 'Miễn phí nội thành cho đơn từ 5 triệu' },
  { icon: ShieldCheck, title: 'Bảo hành 24 tháng', text: 'Đổi mới nếu lỗi kết cấu' },
  { icon: Headset, title: 'Tư vấn không gian', text: 'Gợi ý bố trí theo diện tích thật' },
];

export const HomePage = () => {
  const settings = useAppSelector((state) => state.settings.data);
  const { handleAdd, adding } = useAddToCart();

  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [bannerList, tree, latest, best, sale, articles] = await Promise.all([
          bannerApi.list(),
          categoryApi.tree(),
          productApi.list({ isNew: true, limit: 8, sort: 'newest' }),
          productApi.list({ isBest: true, limit: 8, sort: 'popular' }),
          productApi.list({ isSale: true, limit: 8, sort: 'newest' }),
          newsApi.list({ limit: 3 }),
        ]);

        if (cancelled) return;
        setBanners(bannerList);
        setCategories(tree);
        setNewProducts(latest.items);
        setBestProducts(best.items);
        setSaleProducts(sale.items);
        setNews(articles.items);
      } catch (error) {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được trang chủ'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <BannerSlider banners={banners} />

      {}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <item.icon className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Mua theo không gian"
          description="Chọn phòng bạn đang muốn hoàn thiện"
          to="/products"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <SafeImage
                  src={category.image ?? ''}
                  alt={category.name}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-sm font-medium group-hover:text-primary">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  {countProducts(category)} sản phẩm
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {isEnabled(settings.showNewProducts) ? (
        <ProductSection
          title="Sản phẩm mới"
          description="Vừa lên kệ trong tháng này"
          to="/products?isNew=true"
          products={newProducts}
          loading={loading}
          onAddToCart={handleAdd}
          adding={adding}
        />
      ) : null}

      {isEnabled(settings.showBestProducts) ? (
        <ProductSection
          title="Bán chạy nhất"
          description="Được khách chọn nhiều nhất"
          to="/products?isBest=true"
          products={bestProducts}
          loading={loading}
          onAddToCart={handleAdd}
          adding={adding}
        />
      ) : null}

      {isEnabled(settings.showSaleProducts) ? (
        <ProductSection
          title="Đang giảm giá"
          description="Ưu đãi có hạn"
          to="/products?isSale=true"
          products={saleProducts}
          loading={loading}
          onAddToCart={handleAdd}
          adding={adding}
        />
      ) : null}

      {isEnabled(settings.showNews) && news.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-8">
          <SectionHeader
            title="Tin tức & kinh nghiệm"
            description="Kiến thức chọn và dùng nội thất"
            to="/news"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {news.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="aspect-[8/5] overflow-hidden bg-muted">
                  <SafeImage
                    src={article.image ?? ''}
                    alt={article.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(article.publishedAt)}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base font-semibold group-hover:text-primary">
                    {article.title}
                  </h3>
                  {article.summary ? (
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                      {article.summary}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};
