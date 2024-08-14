import { Movie } from '@utils/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FAVORITES_KEY } from '../configs/constants';
import { AsyncStorageImpl } from '../libs/storage/async-storage';

const storage = new AsyncStorageImpl();

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) => {
        const favorites = get().favorites;
        set({ favorites: [...favorites, movie] });
      },
      removeFavorite: (movieId) => {
        const favorites = get().favorites;
        set({ favorites: favorites.filter((movie) => movie.id !== movieId) });
      },
    }),
    {
      name: FAVORITES_KEY,
      storage: {
        getItem: async () => {
          const value = await storage.getItem(FAVORITES_KEY);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (value) => {
          await storage.setItem(FAVORITES_KEY, JSON.stringify(value));
        },
        removeItem: async () => {
          await storage.removeItem(FAVORITES_KEY);
        },
      },
    }
  )
);
