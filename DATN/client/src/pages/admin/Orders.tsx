import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Pagination } from '@/components/common/Pagination';
import { SafeImage } from '@/components/common/SafeImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EmptyState, LoadingBlock, Spinner } from '@/components/ui/feedback';
import { Input, Label, Select } from '@/components/ui/input';
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from '@/components/ui/table';
import { useDebounce } from '@/hooks/useDebounce';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import {
  NEXT_ORDER_STATUSES,
  ORDER_STATUS_CLASSES,
  ORDER_STATUS_LABELS,
  PAYMENT_LABELS,
} from '@/lib/constants';
import { formatCurrency, formatDateTime } from '@/lib/format';
import { cn } from '@/lib/utils';
import { getErrorMessage } from '@/services/axios';
import { orderApi } from '@/services/shop.api';
import type { OrderDetail, OrderStatus, OrderSummary, PageMeta } from '@/types';

const DEFAULT_META: PageMeta = { page: 1, limit: 10, total: 0, totalPages: 1 };

export const AdminOrdersPage = () => {
  useDocumentTitle('Quản lý đơn hàng');

  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [meta, setMeta] = useState<PageMeta>(DEFAULT_META);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const [selected, setSelected] = useState<OrderDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [updating, setUpdating] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => setPage(1), [debouncedSearch, statusFilter]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    orderApi
      .all({
        page,
        limit: 10,
        search: debouncedSearch || undefined,
        status: statusFilter || undefined,
      })
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
  }, [page, debouncedSearch, statusFilter, reloadKey]);

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

  const changeStatus = async (next: OrderStatus) => {
    if (!selected) return;
    setUpdating(true);
    try {
      const updated = await orderApi.updateStatus(selected.id, next);
      setSelected(updated);
      setReloadKey((key) => key + 1);
      toast.success(`Đã chuyển sang "${ORDER_STATUS_LABELS[next]}"`);
      if (next === 'CANCELLED') {
        toast.info('Số lượng sản phẩm đã được cộng lại vào kho');
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Đổi trạng thái thất bại'));
    } finally {
      setUpdating(false);
    }
  };

  const nextOptions = selected ? NEXT_ORDER_STATUSES[selected.status] : [];

  return (
    <div>
      <AdminPageHeader
        title="Quản lý đơn hàng"
        description={loading ? 'Đang tải...' : `${meta.total} đơn hàng`}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tìm mã đơn, tên hoặc số điện thoại..."
          className="max-w-sm"
        />
        <Select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as OrderStatus | '')}
          className="max-w-44"
          aria-label="Lọc theo trạng thái"
        >
          <option value="">Tất cả trạng thái</option>
          {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map((status) => (
            <option key={status} value={status}>
              {ORDER_STATUS_LABELS[status]}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <LoadingBlock />
      ) : orders.length === 0 ? (
        <EmptyState title="Không có đơn hàng nào" />
      ) : (
        <>
          <TableWrapper>
            <Table>
              <Thead>
                <tr>
                  <Th>Mã đơn</Th>
                  <Th>Khách hàng</Th>
                  <Th className="text-center">SL</Th>
                  <Th className="text-right">Tổng tiền</Th>
                  <Th>Thanh toán</Th>
                  <Th>Trạng thái</Th>
                  <Th>Ngày đặt</Th>
                  <Th className="w-16 text-right">Xem</Th>
                </tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order.id}>
                    <Td className="font-mono text-xs font-medium">{order.code}</Td>
                    <Td>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                    </Td>
                    <Td className="text-center">{order._count.items}</Td>
                    <Td className="whitespace-nowrap text-right font-medium">
                      {formatCurrency(order.total)}
                    </Td>
                    <Td className="text-xs text-muted-foreground">
                      {order.paymentMethod === 'COD' ? 'COD' : 'Chuyển khoản'}
                      {order.paidAt ? (
                        <Badge variant="success" className="ml-1.5">
                          Đã trả
                        </Badge>
                      ) : null}
                    </Td>
                    <Td>
                      <Badge
                        variant="outline"
                        className={cn('border', ORDER_STATUS_CLASSES[order.status])}
                      >
                        {ORDER_STATUS_LABELS[order.status]}
                      </Badge>
                    </Td>
                    <Td className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatDateTime(order.createdAt)}
                    </Td>
                    <Td>
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => void openDetail(order.id)}
                          disabled={loadingDetail}
                          aria-label="Xem chi tiết"
                        >
                          <Eye />
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableWrapper>

          <div className="mt-4">
            <Pagination meta={meta} onChange={setPage} />
          </div>
        </>
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

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 rounded-lg bg-muted/60 p-3 text-sm">
                  <p className="font-medium">Người nhận</p>
                  <p>{selected.customerName}</p>
                  <p className="text-muted-foreground">{selected.customerPhone}</p>
                  {selected.customerEmail ? (
                    <p className="text-muted-foreground">{selected.customerEmail}</p>
                  ) : null}
                  <p className="text-muted-foreground">{selected.shippingAddress}</p>
                </div>

                <div className="space-y-1 rounded-lg bg-muted/60 p-3 text-sm">
                  <p className="font-medium">Tài khoản đặt</p>
                  <p>{selected.user?.name ?? '—'}</p>
                  <p className="text-muted-foreground">{selected.user?.email ?? ''}</p>
                  {selected.note ? (
                    <p className="mt-2">
                      <span className="text-muted-foreground">Ghi chú: </span>
                      {selected.note}
                    </p>
                  ) : null}
                </div>
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
                      <p className="line-clamp-2 text-sm">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} × {formatCurrency(item.price)}
                        {item.productId === null ? ' · sản phẩm đã bị xoá' : ''}
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

              <div className="rounded-lg border border-border p-3">
                <Label>Cập nhật trạng thái</Label>
                {nextOptions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Đơn đã kết thúc, không thể đổi trạng thái nữa.
                  </p>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {nextOptions.map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={status === 'CANCELLED' ? 'destructive' : 'default'}
                          disabled={updating}
                          onClick={() => void changeStatus(status)}
                        >
                          {updating ? <Spinner /> : null}
                          {ORDER_STATUS_LABELS[status]}
                        </Button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Trạng thái chỉ đi tiến theo luồng. Huỷ đơn sẽ cộng lại số lượng vào kho.
                    </p>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
};
