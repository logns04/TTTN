import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/services/axios';
import { cartApi } from '@/services/shop.api';
import type { Cart } from '@/types';
import { logout } from './authSlice';

interface CartState {
  data: Cart | null;
  loading: boolean;

  mutating: boolean;
}

const initialState: CartState = { data: null, loading: false, mutating: false };

const cartThunk = <Arg>(name: string, run: (arg: Arg) => Promise<Cart>, fallback: string) =>
  createAsyncThunk(`cart/${name}`, async (arg: Arg, { rejectWithValue }) => {
    try {
      return await run(arg);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, fallback));
    }
  });

export const fetchCart = cartThunk<void>('fetch', () => cartApi.get(), 'Không tải được giỏ hàng');

export const addToCart = cartThunk<{ productId: number; quantity?: number }>(
  'add',
  ({ productId, quantity }) => cartApi.addItem(productId, quantity ?? 1),
  'Không thêm được vào giỏ hàng',
);

export const updateCartItem = cartThunk<{ itemId: number; quantity: number }>(
  'update',
  ({ itemId, quantity }) => cartApi.updateItem(itemId, quantity),
  'Không cập nhật được giỏ hàng',
);

export const removeCartItem = cartThunk<number>(
  'remove',
  (itemId) => cartApi.removeItem(itemId),
  'Không xoá được sản phẩm',
);

export const clearCart = cartThunk<void>('clear', () => cartApi.clear(), 'Không xoá được giỏ hàng');

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })

      .addCase(logout, (state) => {
        state.data = null;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('cart/') &&
          action.type.endsWith('/pending') &&
          action.type !== fetchCart.pending.type,
        (state) => {
          state.mutating = true;
        },
      )
      .addMatcher(
        (action) => action.type.startsWith('cart/') && action.type.endsWith('/fulfilled'),
        (state, action: { payload: Cart }) => {
          state.mutating = false;
          state.data = action.payload;
        },
      )
      .addMatcher(
        (action) => action.type.startsWith('cart/') && action.type.endsWith('/rejected'),
        (state) => {
          state.mutating = false;
        },
      );
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
