import { create } from "zustand";

interface User {
  id: string;
  username: string;
  type: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  setAuth: (user, token) => set({ user, accessToken: token, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
