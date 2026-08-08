import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export const DropdownMenuContent = ({
  className,
  align = 'end',
  sideOffset = 6,
  ...props
}: ComponentProps<typeof DropdownPrimitive.Content>) => (
  <DropdownPrimitive.Portal>
    <DropdownPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-48 overflow-hidden rounded-lg border border-border bg-card p-1 shadow-lg',
        className,
      )}
      {...props}
    />
  </DropdownPrimitive.Portal>
);

export const DropdownMenuItem = ({
  className,
  ...props
}: ComponentProps<typeof DropdownPrimitive.Item>) => (
  <DropdownPrimitive.Item
    className={cn(
      'flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-sm outline-none transition-colors data-[highlighted]:bg-muted [&_svg]:size-4 [&_svg]:text-muted-foreground',
      className,
    )}
    {...props}
  />
);

export const DropdownMenuLabel = ({
  className,
  ...props
}: ComponentProps<typeof DropdownPrimitive.Label>) => (
  <DropdownPrimitive.Label
    className={cn('px-2.5 py-2 text-xs text-muted-foreground', className)}
    {...props}
  />
);

export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof DropdownPrimitive.Separator>) => (
  <DropdownPrimitive.Separator className={cn('my-1 h-px bg-border', className)} {...props} />
);
