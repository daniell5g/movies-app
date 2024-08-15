import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { THEME_KEY } from '../configs/constants';
import { AsyncStorageImpl } from '../libs/storage/async-storage';
import { ThemeName, themes, ThemeType } from '../theme';

interface ThemeStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  changeTheme: (newTheme: ThemeName) => void;
}

const storage = new AsyncStorageImpl();

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: themes.default,
      setTheme: (theme: ThemeType) => set({ theme }),
      changeTheme: async (newTheme: ThemeName) => {
        if (themes[newTheme]) {
          set({ theme: themes[newTheme] });
          await storage.setItem(THEME_KEY, JSON.stringify(newTheme));
        }
      },
    }),
    {
      name: THEME_KEY,
      storage: {
        getItem: async (name: string) => {
          const value = await storage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name: string, value: any) => {
          await storage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name: string) => {
          await storage.removeItem(name);
        }
      },
    }
  )
);
