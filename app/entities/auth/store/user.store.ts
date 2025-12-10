import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  vkid: number;
  username: string;
  email: string;
}

interface UserState {
  user?: AuthUser;
  pendingAuth?: {
    username: string;
    email: string;
    vkid: number;
    code: string;
    state: string;
    deviceID: string;
    codeVerifier: string;
  };
  setUser: (user: AuthUser) => void;
  setPendingAuth: (pending: UserState['pendingAuth'] | undefined) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      pendingAuth: undefined,
      setUser: (user) => set({ user, pendingAuth: undefined }),
      setPendingAuth: (pending) => set({ pendingAuth: pending }),
      logout: () => set({ user: undefined, pendingAuth: undefined }),
    }),
    { name: 'user' },
  ),
);
