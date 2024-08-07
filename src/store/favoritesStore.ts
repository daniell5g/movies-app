import { Movie } from '@utils/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      name: 'favorites-storage',
      storage: {
        getItem: async (name) => {
          const value = await storage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await storage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await storage.removeItem(name);
        },
      },
    }
  )
);
