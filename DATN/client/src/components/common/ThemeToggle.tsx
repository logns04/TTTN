import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleTheme } from '@/store/slices/themeSlice';

export const ThemeToggle = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
      title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
};
