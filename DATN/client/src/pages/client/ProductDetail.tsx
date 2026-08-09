import { Check, Minus, Plus, ShoppingCart, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ProductCard } from '@/components/common/ProductCard';
import { SafeImage } from '@/components/common/SafeImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState, LoadingBlock } from '@/components/ui/feedback';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { discountPercent, formatCurrency, formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getErrorMessage } from '@/services/axios';
import { productApi } from '@/services/catalog.api';
import type { Product, ProductDetail as ProductDetailType } from '@/types';
import { useAddToCart } from './useAddToCart';

export const ProductDetailPage = () => {
  const { slug = '' } = useParams();
  const { handleAdd, adding } = useAddToCart();

  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setActiveImage(0);
    setQuantity(1);

    productApi
      .detail(slug)
      .then(async (detail) => {
        if (cancelled) return;
        setProduct(detail);
        const items = await productApi.related(detail.id).catch(() => []);
        if (!cancelled) setRelated(items);
      })
      .catch((error) => {
        if (cancelled) return;
        setNotFound(true);
        toast.error(getErrorMessage(error, 'Không tìm thấy sản phẩm'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useDocumentTitle(product?.name);

  if (loading) return <LoadingBlock label="Đang tải sản phẩm..." />;

  if (notFound || !product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title="Không tìm thấy sản phẩm"
          description="Sản phẩm có thể đã bị xoá hoặc ngừng bán."
          action={
            <Button asChild>
              <Link to="/products">Xem sản phẩm khác</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const gallery = product.images.length > 0 ? product.images.map((image) => image.url) : [product.image];
  const discount = discountPercent(product.price, product.salePrice);
  const outOfStock = product.quantity <= 0;
  const maxQuantity = Math.max(1, Math.min(product.quantity, 99));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Trang chủ
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary">
          Sản phẩm
        </Link>
        <span>/</span>
        <Link to={`/products?category=${product.category.slug}`} className="hover:text-primary">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="line-clamp-1 text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl border border-border bg-muted">
            <SafeImage
              src={gallery[activeImage] ?? product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          {gallery.length > 1 ? (
            <div className="mt-3 flex gap-2">
              {gallery.map((url, index) => (
                <button
                  key={`${url}-${index}`}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    'size-20 overflow-hidden rounded-md border-2 transition-colors',
                    index === activeImage ? 'border-primary' : 'border-border hover:border-primary/50',
                  )}
                  aria-label={`Xem ảnh ${index + 1}`}
                >
                  <SafeImage
                    src={url}
                    alt={`${product.name} ảnh ${index + 1}`}
                    className="size-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5">
            {product.isNew ? <Badge>Mới</Badge> : null}
            {product.isBest ? <Badge variant="outline">Bán chạy</Badge> : null}
            {discount ? <Badge variant="destructive">Giảm {discount}%</Badge> : null}
          </div>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{product.name}</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Danh mục:{' '}
            <Link
              to={`/products?category=${product.category.slug}`}
              className="text-primary hover:underline"
            >
              {product.category.name}
            </Link>
            <span className="mx-2">·</span>
            {formatNumber(product.viewCount)} lượt xem
          </p>

          <div className="mt-4 flex flex-wrap items-baseline gap-3 rounded-lg bg-muted/60 p-4">
            <span className="text-3xl font-bold text-primary">
              {formatCurrency(product.effectivePrice)}
            </span>
            {product.salePrice ? (
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            ) : null}
          </div>

          {product.shortDescription ? (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
          ) : null}

          <div className="mt-4 space-y-1.5 text-sm">
            <p className="flex items-center gap-2">
              <Check className={cn('size-4', outOfStock ? 'text-destructive' : 'text-success')} />
              {outOfStock ? 'Tạm hết hàng' : `Còn ${formatNumber(product.quantity)} sản phẩm`}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Truck className="size-4" />
              {product.effectivePrice >= FREE_SHIPPING_THRESHOLD
                ? 'Miễn phí giao hàng và lắp đặt nội thành'
                : `Phí giao hàng 300.000đ, miễn phí cho đơn từ ${formatCurrency(FREE_SHIPPING_THRESHOLD)}`}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity <= 1 || outOfStock}
                aria-label="Giảm số lượng"
              >
                <Minus />
              </Button>
              <input
                type="number"
                min={1}
                max={maxQuantity}
                value={quantity}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  if (!Number.isFinite(next)) return;
                  setQuantity(Math.min(maxQuantity, Math.max(1, Math.floor(next))));
                }}
                className="w-12 border-0 bg-transparent text-center text-sm outline-none"
                aria-label="Số lượng"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
                disabled={quantity >= maxQuantity || outOfStock}
                aria-label="Tăng số lượng"
              >
                <Plus />
              </Button>
            </div>

            <Button
              size="lg"
              className="flex-1 sm:flex-none"
              disabled={adding || outOfStock}
              onClick={() => handleAdd(product, quantity)}
            >
              <ShoppingCart />
              {outOfStock ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
            </Button>
          </div>

          {product.description ? (
            <div className="mt-8">
              <h2 className="mb-2 text-lg font-semibold">Thông tin sản phẩm</h2>
              <div
                className="prose-noithat text-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} onAddToCart={handleAdd} adding={adding} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};
