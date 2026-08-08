import { Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Pagination } from '@/components/common/Pagination';
import { SafeImage } from '@/components/common/SafeImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EmptyState, LoadingBlock } from '@/components/ui/feedback';
import { Select } from '@/components/ui/input';
import { ORDER_STATUS_CLASSES, ORDER_STATUS_LABELS, PAYMENT_LABELS } from '@/lib/constants';
import { formatCurrency, formatDateTime } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getErrorMessage } from '@/services/axios';
import { orderApi } from '@/services/shop.api';
import type { OrderDetail, OrderStatus, OrderSummary, PageMeta } from '@/types';

const DEFAULT_META: PageMeta = { page: 1, limit: 10, total: 0, totalPages: 1 };

export const MyOrdersPage = () => {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [meta, setMeta] = useState<PageMeta>(DEFAULT_META);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatus | ''>('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<OrderDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useDocumentTitle('Đơn hàng của tôi');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    orderApi
      .mine({ page, limit: 10, status: status || undefined })
      .then((result) => {
        if (cancelled) return;
        setOrders(result.items);
        setMeta(result.meta);
      })
      .catch((error) => {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được đơn hàng'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, status]);

  const openDetail = async (id: number) => {
    setLoadingDetail(true);
    try {
      setSelected(await orderApi.detail(id));
    } catch (error) {
      toast.error(getErrorMessage(error, 'Không tải được chi tiết đơn'));
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Đơn hàng của tôi</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading ? 'Đang tải...' : `${meta.total} đơn hàng`}
          </p>
        </div>

        <div className="w-44">
          <Select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as OrderStatus | '');
              setPage(1);
            }}
            aria-label="Lọc theo trạng thái"
            className="h-9"
          >
            <option value="">Tất cả trạng thái</option>
            {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map((key) => (
              <option key={key} value={key}>
                {ORDER_STATUS_LABELS[key]}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {loading ? (
        <LoadingBlock />
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<Package className="size-8" />}
          title="Chưa có đơn hàng nào"
          description="Các đơn bạn đặt sẽ xuất hiện ở đây."
          action={
            <Button asChild>
              <Link to="/products">Bắt đầu mua sắm</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{order.code}</p>
                    <Badge
                      variant="outline"
                      className={cn('border', ORDER_STATUS_CLASSES[order.status])}
                    >
                      {ORDER_STATUS_LABELS[order.status]}
                    </Badge>
                    {order.paidAt ? <Badge variant="success">Đã thanh toán</Badge> : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDateTime(order.createdAt)} · {order._count.items} sản phẩm ·{' '}
                    {PAYMENT_LABELS[order.paymentMethod]}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-primary">{formatCurrency(order.total)}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void openDetail(order.id)}
                    disabled={loadingDetail}
                  >
                    Chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="pt-4">
            <Pagination meta={meta} onChange={setPage} />
          </div>
        </div>
      )}

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected ? (
          <DialogContent
            title={`Đơn hàng ${selected.code}`}
            description={formatDateTime(selected.createdAt)}
            className="max-w-2xl"
          >
            <div className="space-y-4 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn('border', ORDER_STATUS_CLASSES[selected.status])}
                >
                  {ORDER_STATUS_LABELS[selected.status]}
                </Badge>
                <Badge variant="muted">{PAYMENT_LABELS[selected.paymentMethod]}</Badge>
              </div>

              <div className="space-y-1 rounded-lg bg-muted/60 p-3 text-sm">
                <p>
                  <span className="text-muted-foreground">Người nhận: </span>
                  {selected.customerName} · {selected.customerPhone}
                </p>
                <p>
                  <span className="text-muted-foreground">Địa chỉ: </span>
                  {selected.shippingAddress}
                </p>
                {selected.note ? (
                  <p>
                    <span className="text-muted-foreground">Ghi chú: </span>
                    {selected.note}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                {selected.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="size-14 shrink-0 overflow-hidden rounded bg-muted">
                      <SafeImage
                        src={item.productImage}
                        alt={item.productName}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      {item.product ? (
                        <Link
                          to={`/products/${item.product.slug}`}
                          className="line-clamp-2 text-sm hover:text-primary"
                        >
                          {item.productName}
                        </Link>
                      ) : (
                        <p className="line-clamp-2 text-sm">{item.productName}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className="text-sm font-medium">{formatCurrency(item.subtotal)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 border-t border-border pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatCurrency(selected.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí giao hàng</span>
                  <span>
                    {selected.shippingFee === 0 ? 'Miễn phí' : formatCurrency(selected.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatCurrency(selected.total)}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
};
