import { createSlice } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'noithat_theme';

const readInitialTheme = (): Theme => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyToDocument = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
};

const initialTheme = readInitialTheme();
applyToDocument(initialTheme);

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: initialTheme } as { theme: Theme },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, state.theme);
      applyToDocument(state.theme);
    },
    setTheme(state, action: { payload: Theme }) {
      state.theme = action.payload;
      localStorage.setItem(STORAGE_KEY, state.theme);
      applyToDocument(state.theme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
