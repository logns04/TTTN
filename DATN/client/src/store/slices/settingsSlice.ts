import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/services/axios';
import { settingsApi } from '@/services/shop.api';
import type { PublicSettings } from '@/types';

interface SettingsState {
  data: PublicSettings;
  loaded: boolean;
}

const fallback: PublicSettings = {
  siteName: 'NT Thành Long',
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

export const isEnabled = (value?: string) => value !== 'false';
