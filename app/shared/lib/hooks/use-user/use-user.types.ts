import type { AuthUser } from '@entities/auth/store/user.store';

export type UseUserResult = {
  user?: AuthUser;
  isAuthenticated: boolean;
};
