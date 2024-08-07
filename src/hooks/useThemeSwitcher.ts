import { useEffect, useState } from 'react'

import { THEME_KEY } from '../configs/constants'
import type { IStorage } from '../libs/storage';
import { AsyncStorageImpl } from '../libs/storage/async-storage';
import themes from '../theme'

export const useThemeSwitcher = (storage: IStorage = new AsyncStorageImpl()) => {
  const [theme, setTheme] = useState(themes.default);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await storage.getItem(THEME_KEY);
      if (storedTheme && themes[storedTheme]) {
        setTheme(themes[storedTheme]);
      }
    };
    loadTheme();
  }, [storage]);

  const changeTheme = async (newTheme: string) => {
    if (themes[newTheme]) {
      setTheme(themes[newTheme]);
      await storage.setItem(THEME_KEY, newTheme);
    }
  };

  return { theme, changeTheme };
};