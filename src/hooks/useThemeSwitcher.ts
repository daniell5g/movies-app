import { useThemeStore } from '../store/themeStore';

export const useThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme);
  const changeTheme = useThemeStore((state) => state.changeTheme);

  return { theme, changeTheme };
};