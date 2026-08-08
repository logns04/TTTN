import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/services/axios';
import { settingsApi } from '@/services/shop.api';
import type { PublicSettings } from '@/types';

interface SettingsState {
  data: PublicSettings;
  loaded: boolean;
}

/**
 * Giá trị mặc định để lần render đầu (trước khi API trả về) không bị nhảy layout
 * hay hiện chuỗi rỗng ở header.
 */
const fallback: PublicSettings = {
  siteName: 'Nội Thất An Viên',
  logo: '',
  primaryColor: '#8B5E3C',
  hotline: '',
  email: '',
  address: '',
  homeBanner: '',
  showNewProducts: 'true',
  showBestProducts: 'true',
  showSaleProducts: 'true',
  showNews: 'true',
};

const initialState: SettingsState = { data: fallback, loaded: false };

/**
 * Màu nhấn do admin chọn được ghi vào biến CSS --primary. Mọi class Tailwind
 * dùng màu primary đọc từ biến này nên đổi một chỗ là cả site đổi, ở cả hai theme.
 */
const applyPrimaryColor = (color: string) => {
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) return;
  document.documentElement.style.setProperty('--primary', color);
  document.documentElement.style.setProperty('--ring', color);
};

export const fetchSettings = createAsyncThunk(
  'settings/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await settingsApi.getPublic();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    /** Admin lưu cấu hình xong thì áp ngay, không cần tải lại trang. */
    applySettings(state, action: { payload: PublicSettings }) {
      state.data = { ...state.data, ...action.payload };
      applyPrimaryColor(state.data.primaryColor ?? '');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      state.data = { ...fallback, ...action.payload };
      state.loaded = true;
      applyPrimaryColor(state.data.primaryColor ?? '');
    });
  },
});

export const { applySettings } = settingsSlice.actions;
export default settingsSlice.reducer;

/** Cờ ẩn/hiện section lưu dạng chuỗi 'true'/'false' trong bảng settings. */
export const isEnabled = (value?: string) => value !== 'false';
