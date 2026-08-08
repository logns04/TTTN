import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setUnauthorizedHandler } from '@/services/axios';
import authReducer, { logout } from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import settingsReducer from './slices/settingsSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    theme: themeReducer,
    settings: settingsReducer,
  },
});

// Axios interceptor không import store được (sẽ thành vòng phụ thuộc), nên store
// tự đăng ký hàm xử lý 401 vào đó.
setUnauthorizedHandler(() => {
  store.dispatch(logout());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
