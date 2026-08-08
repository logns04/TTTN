import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { discountPercent, formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  adding?: boolean;
}

export const ProductCard = ({ product, onAddToCart, adding }: ProductCardProps) => {
  const discount = discountPercent(product.price, product.salePrice);
  const outOfStock = product.quantity <= 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {discount ? <Badge variant="destructive">-{discount}%</Badge> : null}
          {product.isNew ? <Badge variant="default">Mới</Badge> : null}
          {product.isBest ? <Badge variant="outline">Bán chạy</Badge> : null}
        </div>

        {outOfStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Badge variant="muted">Hết hàng</Badge>
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-xs text-muted-foreground">{product.category?.name}</p>

        <Link
          to={`/products/${product.slug}`}
          className="line-clamp-2 text-sm font-medium leading-snug hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex flex-wrap items-baseline gap-2">
          <span className="font-semibold text-primary">
            {formatCurrency(product.effectivePrice)}
          </span>
          {product.salePrice ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(product.price)}
            </span>
          ) : null}
        </div>

        {onAddToCart ? (
          <Button
            size="sm"
            variant="outline"
            className={cn('mt-1 w-full', outOfStock && 'pointer-events-none opacity-50')}
            disabled={adding || outOfStock}
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart />
            {outOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
          </Button>
        ) : null}
      </div>
    </div>
  );
};
