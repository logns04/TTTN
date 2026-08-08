import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const Card = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('rounded-xl border border-border bg-card text-card-foreground', className)}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('flex flex-col gap-1 border-b border-border p-4', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: ComponentProps<'h3'>) => (
  <h3 className={cn('text-base font-semibold', className)} {...props} />
);

export const CardDescription = ({ className, ...props }: ComponentProps<'p'>) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props} />
);

export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('p-4', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('flex items-center gap-2 border-t border-border p-4', className)} {...props} />
);
