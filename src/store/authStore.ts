import { AUTH_STORAGE_KEY } from 'src/configs/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AsyncStorageImpl } from '../libs/storage/async-storage';

const storage = new AsyncStorageImpl();

interface AuthState {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loggedIn: false,
      login: () => {
        set({ loggedIn: true });
        storage.setItem(AUTH_STORAGE_KEY, 'true');
      },
      logout: () => {
        set({ loggedIn: false });
        storage.removeItem(AUTH_STORAGE_KEY);
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => storage,
    }
  )
);
