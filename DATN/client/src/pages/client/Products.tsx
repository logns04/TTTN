import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Pagination } from '@/components/common/Pagination';
import { ProductCard } from '@/components/common/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState, ProductGridSkeleton } from '@/components/ui/feedback';
import { Input, Label, Select } from '@/components/ui/input';
import { PRICE_RANGES, PRODUCT_SORT_OPTIONS } from '@/lib/constants';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getErrorMessage } from '@/services/axios';
import { categoryApi, productApi } from '@/services/catalog.api';
import type { Category, PageMeta, Product } from '@/types';
import { useAddToCart } from './useAddToCart';

const DEFAULT_META: PageMeta = { page: 1, limit: 12, total: 0, totalPages: 1 };

export const ProductsPage = () => {

  const [params, setParams] = useSearchParams();

  const [tree, setTree] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PageMeta>(DEFAULT_META);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { handleAdd, adding } = useAddToCart();

  const category = params.get('category') ?? '';
  const sort = params.get('sort') ?? 'newest';
  const minPrice = params.get('minPrice') ?? '';
  const maxPrice = params.get('maxPrice') ?? '';
  const page = Number(params.get('page') ?? 1);
  const isNew = params.get('isNew') === 'true';
  const isSale = params.get('isSale') === 'true';
  const isBest = params.get('isBest') === 'true';


  const [searchInput, setSearchInput] = useState(params.get('search') ?? '');
  const debouncedSearch = useDebounce(searchInput, 400);
  const activeSearch = params.get('search') ?? '';

  useEffect(() => {
    categoryApi.tree().then(setTree).catch(() => setTree([]));
  }, []);

  const updateParams = (changes: Record<string, string | undefined>) => {
    const next = new URLSearchParams(params);

    for (const [key, value] of Object.entries(changes)) {
      if (!value) next.delete(key);
      else next.set(key, value);
    }
    if (!('page' in changes)) next.delete('page');

    setParams(next, { replace: true });
  };

  useEffect(() => {
    if (debouncedSearch !== activeSearch) {
      updateParams({ search: debouncedSearch || undefined });
    }

  }, [debouncedSearch]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    productApi
      .list({
        page,
        limit: 12,
        search: activeSearch || undefined,
        category: category || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sort,
        isNew: isNew || undefined,
        isSale: isSale || undefined,
        isBest: isBest || undefined,
      })
      .then((result) => {
        if (cancelled) return;
        setProducts(result.items);
        setMeta(result.meta);
      })
      .catch((error) => {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được danh sách sản phẩm'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, activeSearch, category, minPrice, maxPrice, sort, isNew, isSale, isBest]);

  const activeCategoryName = useMemo(() => {
    for (const parent of tree) {
      if (parent.slug === category) return parent.name;
      const child = parent.children?.find((item) => item.slug === category);
      if (child) return child.name;
    }
    return '';
  }, [tree, category]);

  useDocumentTitle(activeCategoryName || 'Tất cả sản phẩm');

  const hasFilters = Boolean(
    category || minPrice || maxPrice || activeSearch || isNew || isSale || isBest,
  );

  const clearAll = () => {
    setSearchInput('');
    setParams(new URLSearchParams(), { replace: true });
  };

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-semibold">Danh mục</p>
        <ul className="space-y-1 text-sm">
          <li>
            <button
              onClick={() => updateParams({ category: undefined })}
              className={cn(
                'w-full rounded px-2 py-1 text-left transition-colors hover:bg-muted',
                !category && 'bg-primary/10 font-medium text-primary',
              )}
            >
              Tất cả
            </button>
          </li>
          {tree.map((parent) => (
            <li key={parent.id}>
              <button
                onClick={() => updateParams({ category: parent.slug })}
                className={cn(
                  'w-full rounded px-2 py-1 text-left font-medium transition-colors hover:bg-muted',
                  category === parent.slug && 'bg-primary/10 text-primary',
                )}
              >
                {parent.name}
              </button>
              {parent.children && parent.children.length > 0 ? (
                <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-2">
                  {parent.children.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => updateParams({ category: child.slug })}
                        className={cn(
                          'w-full rounded px-2 py-1 text-left text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                          category === child.slug && 'bg-primary/10 font-medium text-primary',
                        )}
                      >
                        {child.name}
                        <span className="ml-1 text-xs opacity-60">
                          ({child._count?.products ?? 0})
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Khoảng giá</p>
        <ul className="space-y-1 text-sm">
          {PRICE_RANGES.map((range) => {
            const active =
              minPrice === String(range.min) &&
              maxPrice === (range.max ? String(range.max) : '');
            return (
              <li key={range.label}>
                <button
                  onClick={() =>
                    updateParams({
                      minPrice: active ? undefined : String(range.min),
                      maxPrice: active || !range.max ? undefined : String(range.max),
                    })
                  }
                  className={cn(
                    'w-full rounded px-2 py-1 text-left transition-colors hover:bg-muted',
                    active && 'bg-primary/10 font-medium text-primary',
                  )}
                >
                  {range.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="minPrice" className="text-xs">
              Từ
            </Label>
            <Input
              id="minPrice"
              type="number"
              min={0}
              step={100000}
              value={minPrice}
              onChange={(event) => updateParams({ minPrice: event.target.value || undefined })}
              placeholder="0"
              className="h-9"
            />
          </div>
          <div>
            <Label htmlFor="maxPrice" className="text-xs">
              Đến
            </Label>
            <Input
              id="maxPrice"
              type="number"
              min={0}
              step={100000}
              value={maxPrice}
              onChange={(event) => updateParams({ maxPrice: event.target.value || undefined })}
              placeholder="Không giới hạn"
              className="h-9"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Lọc nhanh</p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { key: 'isNew', label: 'Hàng mới', active: isNew },
            { key: 'isSale', label: 'Đang giảm giá', active: isSale },
            { key: 'isBest', label: 'Bán chạy', active: isBest },
          ].map((flag) => (
            <Button
              key={flag.key}
              size="sm"
              variant={flag.active ? 'default' : 'outline'}
              onClick={() => updateParams({ [flag.key]: flag.active ? undefined : 'true' })}
            >
              {flag.label}
            </Button>
          ))}
        </div>
      </div>

      {hasFilters ? (
        <Button variant="ghost" size="sm" className="w-full" onClick={clearAll}>
          <X />
          Bỏ tất cả bộ lọc
        </Button>
      ) : null}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Trang chủ
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{activeCategoryName || 'Tất cả sản phẩm'}</span>
      </nav>

      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{activeCategoryName || 'Tất cả sản phẩm'}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading ? 'Đang tải...' : `${meta.total} sản phẩm`}
            {minPrice || maxPrice ? (
              <>
                {' · '}
                {minPrice ? formatCurrency(Number(minPrice)) : '0đ'} –{' '}
                {maxPrice ? formatCurrency(Number(maxPrice)) : 'không giới hạn'}
              </>
            ) : null}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setFiltersOpen((open) => !open)}
          >
            <SlidersHorizontal />
            Bộ lọc
          </Button>

          <div className="w-44">
            <Select
              value={sort}
              onChange={(event) => updateParams({ sort: event.target.value })}
              aria-label="Sắp xếp"
              className="h-9"
            >
              {PRODUCT_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="mb-4 max-w-md">
        <Input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Tìm trong danh sách..."
          aria-label="Tìm sản phẩm"
        />
      </div>

      {hasFilters ? (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {activeSearch ? (
            <Badge variant="outline">
              Tìm: {activeSearch}
              <button
                onClick={() => {
                  setSearchInput('');
                  updateParams({ search: undefined });
                }}
                aria-label="Bỏ từ khoá"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ) : null}
          {activeCategoryName ? (
            <Badge variant="outline">
              {activeCategoryName}
              <button onClick={() => updateParams({ category: undefined })} aria-label="Bỏ danh mục">
                <X className="size-3" />
              </button>
            </Badge>
          ) : null}
        </div>
      ) : null}

      <div className="flex gap-6">
        <aside
          className={cn(
            'w-60 shrink-0 lg:block',
            filtersOpen
              ? 'fixed inset-x-4 top-20 z-40 max-h-[70vh] w-auto overflow-y-auto rounded-xl border border-border bg-card p-4 shadow-xl lg:static lg:max-h-none lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none'
              : 'hidden',
          )}
        >
          {filterPanel}
        </aside>

        <div className="min-w-0 flex-1">
          {loading ? (
            <ProductGridSkeleton count={12} />
          ) : products.length === 0 ? (
            <EmptyState
              title="Không tìm thấy sản phẩm nào"
              description="Thử bỏ bớt bộ lọc hoặc dùng từ khoá khác."
              action={
                hasFilters ? (
                  <Button variant="outline" onClick={clearAll}>
                    Bỏ tất cả bộ lọc
                  </Button>
                ) : null
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAdd}
                    adding={adding}
                  />
                ))}
              </div>

              <div className="mt-8">
                <Pagination
                  meta={meta}
                  onChange={(nextPage) => {
                    updateParams({ page: String(nextPage) });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
