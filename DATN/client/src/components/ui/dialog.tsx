import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent = ({
  className,
  children,
  title,
  description,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  title: string;
  description?: ReactNode;
}) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in" />
    <DialogPrimitive.Content
      className={cn(
        'fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-border bg-card shadow-xl',
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border p-4">
        <div>
          <DialogPrimitive.Title className="font-display text-lg font-semibold">
            {title}
          </DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
              {description}
            </DialogPrimitive.Description>
          ) : null}
        </div>
        <DialogPrimitive.Close
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Đóng"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </div>
      <div className="scrollbar-thin flex-1 overflow-y-auto">{children}</div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
