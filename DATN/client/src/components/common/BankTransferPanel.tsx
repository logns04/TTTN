import { AlertTriangle, CheckCircle2, Copy, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import { getErrorMessage } from '@/services/axios';
import { paymentApi } from '@/services/shop.api';
import type { PaymentInfo } from '@/types';

/** Bao lâu dò một lần, và dừng sau bao lâu để khỏi gọi API mãi. */
const POLL_MS = 5000;
const STOP_AFTER_MS = 10 * 60 * 1000;

const CopyRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-3 border-b border-border py-2 last:border-0">
    <span className="shrink-0 py-0.5 text-sm text-muted-foreground">{label}</span>
    <span className="flex min-w-0 items-start gap-1.5">
      {/* Xuống dòng thay vì cắt bớt: tên chủ tài khoản bị cắt thì người dùng
          không đối chiếu được với app ngân hàng. */}
      <span className="break-words py-0.5 text-right font-medium">{value}</span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => {
          void navigator.clipboard.writeText(value);
          toast.success(`Đã copy ${label.toLowerCase()}`);
        }}
        aria-label={`Copy ${label}`}
      >
        <Copy />
      </Button>
    </span>
  </div>
);

/**
 * Màn chuyển khoản: QR + thông tin tài khoản, tự dò khi tiền về.
 *
 * Việc dò là cần thiết vì tiền về qua webhook từ SePay ở phía máy chủ — trình
 * duyệt không có cách nào biết nếu không hỏi lại.
 */
export const BankTransferPanel = ({ orderId }: { orderId: number }) => {
  const [info, setInfo] = useState<PaymentInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const poll = async () => {
      try {
        const data = await paymentApi.info(orderId);
        if (cancelled) return;
        setInfo(data);
        setError(null);

        // Dừng khi đã nhận tiền, hoặc quá lâu — khách sẽ tự tải lại trang.
        if (data.paid || Date.now() - startedAt.current > STOP_AFTER_MS) return;
      } catch (caught) {
        if (!cancelled) setError(getErrorMessage(caught, 'Không kiểm tra được thanh toán'));
      }
      if (!cancelled) timer = window.setTimeout(poll, POLL_MS);
    };

    void poll();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [orderId]);

  if (!info) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg border border-border py-8 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Đang tải thông tin chuyển khoản...
      </div>
    );
  }

  if (info.paid) {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 p-4 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" />
        <p className="mt-2 font-semibold text-success">Đã nhận được thanh toán</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Đơn hàng đã được xác nhận tự động. Chúng tôi sẽ liên hệ giao hàng.
        </p>
      </div>
    );
  }

  if (!info.configured) {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
        <p>
          Cửa hàng chưa cấu hình tài khoản nhận chuyển khoản. Nhân viên sẽ gọi để hướng dẫn thanh
          toán.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">Quét mã để chuyển khoản</p>
        <Badge variant="warning" className="gap-1.5">
          <Loader2 className="size-3 animate-spin" />
          Đang chờ thanh toán
        </Badge>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {info.qrUrl ? (
          <img
            src={info.qrUrl}
            alt={`Mã QR chuyển khoản ${formatCurrency(info.amount)}`}
            className="mx-auto size-52 shrink-0 rounded-lg border border-border bg-white object-contain p-1"
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <CopyRow label="Ngân hàng" value={info.bankCode ?? ''} />
          <CopyRow label="Số tài khoản" value={info.bankAccount ?? ''} />
          {info.accountName ? <CopyRow label="Chủ tài khoản" value={info.accountName} /> : null}
          <CopyRow label="Số tiền" value={String(info.amount)} />
          <CopyRow label="Nội dung" value={info.transferContent} />
        </div>
      </div>

      <p className="mt-3 rounded-md bg-muted p-2.5 text-xs text-muted-foreground">
        <strong className="text-foreground">Giữ nguyên nội dung chuyển khoản</strong> —
        hệ thống dựa vào mã <code className="font-mono">{info.transferContent}</code> để tự khớp
        đơn. Ghi sai thì đơn vẫn phải chờ xác nhận thủ công.
      </p>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Trang này tự cập nhật khi nhận được tiền, không cần tải lại.
      </p>

      {error ? <p className="mt-2 text-center text-xs text-destructive">{error}</p> : null}
    </div>
  );
};
