import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage, tokenStore } from '@/services/axios';
import { authApi } from '@/services/shop.api';
import type { Role, User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;

  status: 'checking' | 'guest' | 'authenticated';
  submitting: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: tokenStore.get(),

  status: tokenStore.get() ? 'checking' : 'guest',
  submitting: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await authApi.login(payload.email, payload.password);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Đăng nhập thất bại'));
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    payload: { name: string; email: string; password: string; phone?: string; address?: string },
    { rejectWithValue },
  ) => {
    try {
      return await authApi.register(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Đăng ký thất bại'));
    }
  },
);

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    return await authApi.me();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (payload: { name: string; phone?: string; address?: string }, { rejectWithValue }) => {
    try {
      return await authApi.updateProfile(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Cập nhật thất bại'));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      tokenStore.clear();
      state.user = null;
      state.token = null;
      state.status = 'guest';
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        tokenStore.set(action.payload.token);
        state.submitting = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'authenticated';
      })
      .addCase(login.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      })

      .addCase(register.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        tokenStore.set(action.payload.token);
        state.submitting = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'authenticated';
      })
      .addCase(register.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'authenticated';
      })
      .addCase(fetchMe.rejected, (state) => {
        tokenStore.clear();
        state.user = null;
        state.token = null;
        state.status = 'guest';
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

export const STAFF_ROLES: Role[] = ['SUPERADMIN', 'ADMIN', 'EDITOR'];
export const isStaff = (role?: Role) => Boolean(role && STAFF_ROLES.includes(role));
