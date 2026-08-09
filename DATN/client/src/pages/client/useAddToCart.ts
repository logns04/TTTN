import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import type { Product } from '@/types';

export const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.auth.status);
  const adding = useAppSelector((state) => state.cart.mutating);

  const handleAdd = async (product: Product, quantity = 1) => {
    if (status !== 'authenticated') {
      toast.info('Bạn cần đăng nhập để thêm vào giỏ hàng');
      navigate('/login', { state: { from: window.location.pathname + window.location.search } });
      return;
    }

    const result = await dispatch(addToCart({ productId: product.id, quantity }));

    if (addToCart.rejected.match(result)) {
      toast.error((result.payload as string) ?? 'Không thêm được vào giỏ hàng');
      return;
    }

    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  return { handleAdd: (product: Product, quantity = 1) => void handleAdd(product, quantity), adding };
};
