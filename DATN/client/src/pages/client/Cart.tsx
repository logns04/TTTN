import { AlertTriangle, ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { SafeImage } from '@/components/common/SafeImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyState, LoadingBlock } from '@/components/ui/feedback';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { formatCurrency } from '@/lib/format';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearCart, fetchCart, removeCartItem, updateCartItem } from '@/store/slices/cartSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: cart, loading, mutating } = useAppSelector((state) => state.cart);
  const [confirmClear, setConfirmClear] = useState(false);

  useDocumentTitle('Giỏ hàng');

  useEffect(() => {
    void dispatch(fetchCart());
  }, [dispatch]);

  const changeQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    const result = await dispatch(updateCartItem({ itemId, quantity }));
    if (updateCartItem.rejected.match(result)) {
      toast.error((result.payload as string) ?? 'Không cập nhật được');
    }
  };

  const remove = async (itemId: number, name: string) => {
    const result = await dispatch(removeCartItem(itemId));
    if (removeCartItem.rejected.match(result)) {
      toast.error((result.payload as string) ?? 'Không xoá được');
      return;
    }
    toast.success(`Đã xoá "${name}" khỏi giỏ hàng`);
  };

  if (loading && !cart) return <LoadingBlock label="Đang tải giỏ hàng..." />;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={<ShoppingCart className="size-8" />}
          title="Giỏ hàng đang trống"
          description="Chọn thêm sản phẩm để tiếp tục đặt hàng."
          action={
            <Button asChild>
              <Link to="/products">Xem sản phẩm</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - cart.subtotal;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-5 text-2xl font-bold">
        Giỏ hàng
        <span className="ml-2 text-base font-normal text-muted-foreground">
          ({cart.totalQuantity} sản phẩm)
        </span>
      </h1>

      {cart.hasUnavailable ? (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
          <p>
            Có sản phẩm trong giỏ đã hết hàng hoặc ngừng bán. Hãy xoá hoặc giảm số lượng trước khi
            đặt hàng.
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {cart.items.map((line) => (
            <Card key={line.id} className={line.unavailable ? 'border-warning/50' : undefined}>
              <CardContent className="flex gap-3 p-3">
                <Link
                  to={`/products/${line.product.slug}`}
                  className="size-24 shrink-0 overflow-hidden rounded-md bg-muted"
                >
                  <SafeImage
                    src={line.product.image}
                    alt={line.product.name}
                    className="size-full object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Link
                    to={`/products/${line.product.slug}`}
                    className="line-clamp-2 text-sm font-medium hover:text-primary"
                  >
                    {line.product.name}
                  </Link>

                  <p className="text-sm text-primary">
                    {formatCurrency(line.unitPrice)}
                    {line.product.salePrice ? (
                      <span className="ml-2 text-xs text-muted-foreground line-through">
                        {formatCurrency(line.product.price)}
                      </span>
                    ) : null}
                  </p>

                  {line.unavailable ? (
                    <Badge variant="warning" className="w-fit">
                      {line.product.status
                        ? `Chỉ còn ${line.product.quantity} sản phẩm`
                        : 'Đã ngừng bán'}
                    </Badge>
                  ) : null}

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center rounded-md border border-border">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={mutating || line.quantity <= 1}
                        onClick={() => void changeQuantity(line.id, line.quantity - 1)}
                        aria-label="Giảm số lượng"
                      >
                        <Minus />
                      </Button>
                      <span className="w-10 text-center text-sm">{line.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={mutating || line.quantity >= line.product.quantity}
                        onClick={() => void changeQuantity(line.id, line.quantity + 1)}
                        aria-label="Tăng số lượng"
                      >
                        <Plus />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">{formatCurrency(line.lineTotal)}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive"
                        disabled={mutating}
                        onClick={() => void remove(line.id, line.product.name)}
                        aria-label="Xoá sản phẩm"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/products">Tiếp tục mua sắm</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-destructive"
              onClick={() => setConfirmClear(true)}
              disabled={mutating}
            >
              <Trash2 />
              Xoá toàn bộ
            </Button>
          </div>
        </div>

        <div>
          <Card className="lg:sticky lg:top-24">
            <CardContent className="space-y-3">
              <p className="font-semibold">Tổng tiền</p>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính</span>
                <span>{formatCurrency(cart.subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phí giao hàng</span>
                <span>
                  {cart.shippingFee === 0 ? (
                    <span className="text-success">Miễn phí</span>
                  ) : (
                    formatCurrency(cart.shippingFee)
                  )}
                </span>
              </div>

              {missingForFreeShipping > 0 ? (
                <p className="rounded-md bg-muted p-2 text-xs text-muted-foreground">
                  Mua thêm {formatCurrency(missingForFreeShipping)} để được miễn phí giao hàng
                </p>
              ) : null}

              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                <span>Thành tiền</span>
                <span className="text-primary">{formatCurrency(cart.total)}</span>
              </div>

              <Button
                size="lg"
                className="w-full"
                disabled={mutating || cart.hasUnavailable}
                onClick={() => navigate('/checkout')}
              >
                Tiến hành đặt hàng
                <ArrowRight />
              </Button>

              {cart.hasUnavailable ? (
                <p className="text-center text-xs text-warning">
                  Xử lý sản phẩm hết hàng trước khi đặt
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmClear}
        onOpenChange={setConfirmClear}
        title="Xoá toàn bộ giỏ hàng?"
        description="Tất cả sản phẩm trong giỏ sẽ bị xoá."
        confirmLabel="Xoá hết"
        loading={mutating}
        onConfirm={() => {
          void dispatch(clearCart()).then(() => {
            setConfirmClear(false);
            toast.success('Đã xoá toàn bộ giỏ hàng');
          });
        }}
      />
    </div>
  );
};
