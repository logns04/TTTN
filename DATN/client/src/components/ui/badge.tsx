import { type VariantProps, cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        outline: 'border-border text-foreground',
        muted: 'border-transparent bg-muted text-muted-foreground',
        success: 'border-success/30 bg-success/15 text-success',
        warning: 'border-warning/30 bg-warning/15 text-warning',
        destructive: 'border-destructive/30 bg-destructive/15 text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export const Badge = ({
  className,
  variant,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);
