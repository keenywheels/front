import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStatus = 'unknown' | 'authenticated' | 'guest';

export interface AuthUser {
  vkid?: number;
  username: string;
  email: string;
}

interface UserState {
  status: AuthStatus;
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
      status: 'unknown',
      user: undefined,
      pendingAuth: undefined,
      setUser: (user) =>
        set({ status: 'authenticated', user, pendingAuth: undefined }),
      setPendingAuth: (pending) =>
        set({ status: 'guest', pendingAuth: pending }),
      logout: () =>
        set({ status: 'guest', user: undefined, pendingAuth: undefined }),
    }),
    { name: 'user' },
  ),
);
