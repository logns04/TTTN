import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/feedback';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
}

/** Hộp xác nhận cho các hành động không hoàn tác được (xoá). */
export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Xoá',
  loading,
  onConfirm,
}: ConfirmDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent title={title} className="max-w-md">
      <div className="flex gap-3 p-4">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div className="text-sm text-muted-foreground">
          {description ?? 'Hành động này không thể hoàn tác.'}
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t border-border p-4">
        <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
          Huỷ
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={loading}>
          {loading ? <Spinner /> : null}
          {confirmLabel}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
