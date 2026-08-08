import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const fieldClass =
  'w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-60';

export const Input = ({ className, ...props }: ComponentProps<'input'>) => (
  <input className={cn(fieldClass, 'h-10', className)} {...props} />
);

export const Textarea = ({ className, ...props }: ComponentProps<'textarea'>) => (
  <textarea className={cn(fieldClass, 'min-h-24 resize-y', className)} {...props} />
);

/**
 * Select dùng thẻ <select> gốc thay vì Radix: ít code hơn nhiều, hoạt động tốt
 * trên mobile (mở picker của hệ điều hành) và không cần quản lý trạng thái mở.
 */
export const Select = ({ className, ...props }: ComponentProps<'select'>) => (
  <select className={cn(fieldClass, 'h-10 cursor-pointer pr-8', className)} {...props} />
);

export const Label = ({ className, ...props }: ComponentProps<'label'>) => (
  <label
    className={cn('mb-1.5 block text-sm font-medium text-foreground', className)}
    {...props}
  />
);

/** Thông báo lỗi dưới mỗi field, dùng chung cho mọi form. */
export const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-xs text-destructive">{message}</p> : null;
