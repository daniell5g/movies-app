import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return { loggedIn, login, logout };
};