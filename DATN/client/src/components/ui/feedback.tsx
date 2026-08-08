import { Loader2, PackageOpen } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
);

export const Spinner = ({ className }: { className?: string }) => (
  <Loader2 className={cn('size-4 animate-spin', className)} />
);

export const LoadingBlock = ({ label = 'Đang tải...' }: { label?: string }) => (
  <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
    <Spinner />
    {label}
  </div>
);

export const EmptyState = ({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-14 text-center">
    <div className="text-muted-foreground">{icon ?? <PackageOpen className="size-8" />}</div>
    <div>
      <p className="font-medium">{title}</p>
      {description ? (
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
    {action}
  </div>
);

/** Lưới skeleton cho danh sách sản phẩm đang tải. */
export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="space-y-2">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);
