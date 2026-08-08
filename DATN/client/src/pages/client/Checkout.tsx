import { zodResolver } from '@hookform/resolvers/zod';
import { Banknote, CheckCircle2, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { BankTransferPanel } from '@/components/common/BankTransferPanel';
import { SafeImage } from '@/components/common/SafeImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingBlock, Spinner } from '@/components/ui/feedback';
import { FieldError, Input, Label, Textarea } from '@/components/ui/input';
import { PAYMENT_LABELS } from '@/lib/constants';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import { emailSchema, phoneSchema } from '@/lib/validation';
import { getErrorMessage } from '@/services/axios';
import { orderApi } from '@/services/shop.api';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCart, resetCart } from '@/store/slices/cartSlice';
import type { OrderDetail } from '@/types';

const schema = z.object({
  customerName: z.string().trim().min(2, 'Vui lòng nhập họ tên').max(120),
  customerPhone: phoneSchema,
  customerEmail: z.union([emailSchema, z.literal('')]).optional(),
  shippingAddress: z
    .string()
    .trim()
    .min(10, 'Địa chỉ cần chi tiết hơn (số nhà, đường, phường, quận)')
    .max(400),
  note: z.string().trim().max(1000).optional(),
  paymentMethod: z.enum(['COD', 'BANK_TRANSFER']),
});

type FormValues = z.infer<typeof schema>;

const PAYMENT_OPTIONS = [
  { value: 'COD', label: PAYMENT_LABELS.COD, icon: Truck, hint: 'Trả tiền khi nhận và kiểm hàng' },
  {
    value: 'BANK_TRANSFER',
    label: PAYMENT_LABELS.BANK_TRANSFER,
    icon: Banknote,
    hint: 'Hiện mã QR ngay sau khi đặt, đơn tự xác nhận khi tiền về',
  },
] as const;

/** Màn hình thành công sau khi đặt hàng, thay vì đẩy thẳng về trang chủ. */
const SuccessScreen = ({ order }: { order: OrderDetail }) => (
  // Rộng hơn phần còn lại của site: khối chuyển khoản có QR nằm cạnh thông tin
  // tài khoản, mà tên chủ tài khoản tiếng Việt viết hoa thì khá dài.
  <div className="mx-auto max-w-3xl px-4 py-14">
    <Card>
      <CardContent className="space-y-4 text-center">
        <CheckCircle2 className="mx-auto size-14 text-success" />
        <div>
          <h1 className="text-2xl font-bold">Đặt hàng thành công</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Mã đơn hàng của bạn là{' '}
            <span className="font-semibold text-foreground">{order.code}</span>.{' '}
            {order.paymentMethod === 'BANK_TRANSFER'
              ? 'Quét mã QR bên dưới để thanh toán, đơn sẽ tự xác nhận khi tiền về.'
              : 'Chúng tôi sẽ gọi xác nhận trong 24 giờ.'}
          </p>
        </div>

        <div className="space-y-2 rounded-lg bg-muted/60 p-4 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Người nhận</span>
            <span className="font-medium">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Điện thoại</span>
            <span className="font-medium">{order.customerPhone}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="shrink-0 text-muted-foreground">Địa chỉ</span>
            <span className="text-right font-medium">{order.shippingAddress}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <span className="text-muted-foreground">Tổng thanh toán</span>
            <span className="font-semibold text-primary">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Chuyển khoản: hiện QR ngay và tự dò khi tiền về, khỏi bắt khách
            chờ nhân viên gọi xác nhận. */}
        {order.paymentMethod === 'BANK_TRANSFER' ? (
          <div className="text-left">
            <BankTransferPanel orderId={order.id} />
          </div>
        ) : null}

        <div className="flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link to="/orders">Xem đơn hàng của tôi</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { data: cart, loading } = useAppSelector((state) => state.cart);

  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<OrderDetail | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      shippingAddress: '',
      note: '',
      paymentMethod: 'COD',
    },
  });

  useEffect(() => {
    void dispatch(fetchCart());
  }, [dispatch]);

  // Điền sẵn từ thông tin tài khoản để khách không phải gõ lại.
  useEffect(() => {
    if (!user) return;
    form.reset({
      customerName: user.name,
      customerPhone: user.phone ?? '',
      customerEmail: user.email,
      shippingAddress: user.address ?? '',
      note: '',
      paymentMethod: 'COD',
    });
  }, [user, form]);

  if (placedOrder) return <SuccessScreen order={placedOrder} />;
  if (loading && !cart) return <LoadingBlock label="Đang tải giỏ hàng..." />;
  if (cart && cart.items.length === 0) return <Navigate to="/cart" replace />;

  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      const order = await orderApi.checkout({
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        customerEmail: values.customerEmail || undefined,
        shippingAddress: values.shippingAddress,
        note: values.note || undefined,
        paymentMethod: values.paymentMethod,
      });

      // Server đã dọn giỏ trong cùng transaction, client chỉ cần đồng bộ lại.
      dispatch(resetCart());
      setPlacedOrder(order);
      toast.success('Đặt hàng thành công');
      window.scrollTo({ top: 0 });
    } catch (error) {
      const message = getErrorMessage(error, 'Đặt hàng thất bại');
      toast.error(message);
      // Hết hàng giữa lúc đặt: tải lại giỏ để hiện cảnh báo đúng thực tế.
      void dispatch(fetchCart());
      navigate('/cart');
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-5 text-2xl font-bold">Đặt hàng</h1>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3" noValidate>
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardContent className="space-y-4">
              <p className="font-semibold">Thông tin người nhận</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="customerName">Họ và tên *</Label>
                  <Input id="customerName" {...form.register('customerName')} />
                  <FieldError message={form.formState.errors.customerName?.message} />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Số điện thoại *</Label>
                  <Input
                    id="customerPhone"
                    placeholder="0912345678"
                    {...form.register('customerPhone')}
                  />
                  <FieldError message={form.formState.errors.customerPhone?.message} />
                </div>
              </div>

              <div>
                <Label htmlFor="customerEmail">Email</Label>
                <Input id="customerEmail" type="email" {...form.register('customerEmail')} />
                <FieldError message={form.formState.errors.customerEmail?.message} />
              </div>

              <div>
                <Label htmlFor="shippingAddress">Địa chỉ giao hàng *</Label>
                <Textarea
                  id="shippingAddress"
                  rows={2}
                  placeholder="Số nhà, đường, phường, quận, thành phố"
                  {...form.register('shippingAddress')}
                />
                <FieldError message={form.formState.errors.shippingAddress?.message} />
              </div>

              <div>
                <Label htmlFor="note">Ghi chú</Label>
                <Textarea
                  id="note"
                  rows={2}
                  placeholder="Giờ nhận hàng, hướng dẫn tìm địa chỉ, yêu cầu lắp đặt..."
                  {...form.register('note')}
                />
                <FieldError message={form.formState.errors.note?.message} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <p className="font-semibold">Hình thức thanh toán</p>

              {PAYMENT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors',
                    paymentMethod === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50',
                  )}
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...form.register('paymentMethod')}
                    className="mt-1 accent-[var(--primary)]"
                  />
                  <option.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.hint}</p>
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="lg:sticky lg:top-24">
            <CardContent className="space-y-3">
              <p className="font-semibold">Đơn hàng ({cart?.totalQuantity ?? 0} sản phẩm)</p>

              <div className="scrollbar-thin max-h-64 space-y-2 overflow-y-auto">
                {cart?.items.map((line) => (
                  <div key={line.id} className="flex gap-2">
                    <div className="size-12 shrink-0 overflow-hidden rounded bg-muted">
                      <SafeImage
                        src={line.product.image}
                        alt={line.product.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-xs">{line.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {line.quantity} × {formatCurrency(line.unitPrice)}
                      </p>
                    </div>
                    <p className="text-xs font-medium">{formatCurrency(line.lineTotal)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-border pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatCurrency(cart?.subtotal ?? 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí giao hàng</span>
                  <span>
                    {cart?.shippingFee === 0 ? (
                      <span className="text-success">Miễn phí</span>
                    ) : (
                      formatCurrency(cart?.shippingFee ?? 0)
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                  <span>Thành tiền</span>
                  <span className="text-primary">{formatCurrency(cart?.total ?? 0)}</span>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? <Spinner /> : null}
                Xác nhận đặt hàng
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/cart">Về giỏ hàng</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};
