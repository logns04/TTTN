import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/** Bọc trong div overflow-x-auto: bảng admin nhiều cột không được làm trang trượt ngang. */
export const TableWrapper = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('scrollbar-thin w-full overflow-x-auto rounded-xl border border-border', className)}
    {...props}
  />
);

export const Table = ({ className, ...props }: ComponentProps<'table'>) => (
  <table className={cn('w-full min-w-[640px] border-collapse text-sm', className)} {...props} />
);

export const Thead = ({ className, ...props }: ComponentProps<'thead'>) => (
  <thead className={cn('bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground', className)} {...props} />
);

export const Th = ({ className, ...props }: ComponentProps<'th'>) => (
  <th className={cn('px-3 py-2.5 font-medium', className)} {...props} />
);

export const Tbody = ({ className, ...props }: ComponentProps<'tbody'>) => (
  <tbody className={cn('divide-y divide-border', className)} {...props} />
);

export const Tr = ({ className, ...props }: ComponentProps<'tr'>) => (
  <tr className={cn('transition-colors hover:bg-muted/40', className)} {...props} />
);

export const Td = ({ className, ...props }: ComponentProps<'td'>) => (
  <td className={cn('px-3 py-2.5 align-middle', className)} {...props} />
);
