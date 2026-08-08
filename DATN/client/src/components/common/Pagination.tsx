import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PageMeta } from '@/types';

const buildPages = (current: number, total: number): (number | 'gap')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = new Set<number>([1, total, current]);
  for (const offset of [-2, -1, 1, 2]) {
    const page = current + offset;
    if (page > 1 && page < total) pages.add(page);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | 'gap')[] = [];

  sorted.forEach((page, index) => {
    const previous = sorted[index - 1];
    if (previous !== undefined && page - previous > 1) result.push('gap');
    result.push(page);
  });

  return result;
};

interface PaginationProps {
  meta: PageMeta;
  onChange: (page: number) => void;
}

export const Pagination = ({ meta, onChange }: PaginationProps) => {
  if (meta.totalPages <= 1) return null;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-1" aria-label="Phân trang">
      <Button
        variant="outline"
        size="icon-sm"
        disabled={meta.page <= 1}
        onClick={() => onChange(meta.page - 1)}
        aria-label="Trang trước"
      >
        <ChevronLeft />
      </Button>

      {buildPages(meta.page, meta.totalPages).map((item, index) =>
        item === 'gap' ? (
          <span key={`gap-${index}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={item}
            size="icon-sm"
            variant={item === meta.page ? 'default' : 'outline'}
            onClick={() => onChange(item)}
            aria-current={item === meta.page ? 'page' : undefined}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon-sm"
        disabled={meta.page >= meta.totalPages}
        onClick={() => onChange(meta.page + 1)}
        aria-label="Trang sau"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
};
