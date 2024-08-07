import { act, renderHook } from '@testing-library/react-hooks';
import { create } from 'zustand';

import { useAuthStore } from '../../store/authStore';
import { useAuth } from '../useAuth';

type AuthState = {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const createTestStore = () => {
  return create<AuthState>((set) => ({
    loggedIn: false,
    login: () => set({ loggedIn: true }),
    logout: () => set({ loggedIn: false }),
  }));
};

describe('useAuth', () => {
  it('should return the correct auth state and functions', () => {
    const store = createTestStore();
    useAuthStore.setState = store.setState;
    useAuthStore.getState = store.getState;

    const { result } = renderHook(() => useAuth());

    expect(result.current.loggedIn).toBe(false);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });

  it('should update loggedIn state correctly', () => {
    const store = createTestStore();
    useAuthStore.setState = store.setState;
    useAuthStore.getState = store.getState;

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login();
    });

    expect(result.current.loggedIn).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.loggedIn).toBe(false);
  });
});
