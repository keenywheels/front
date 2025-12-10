import { useUserStore } from '@entities/auth';

import type { UseUserResult } from './use-user.types';

export const useUser = (): UseUserResult => {
  const user = useUserStore((state) => state.user);
  return {
    user: user,
    isAuthenticated: !!user,
  };
};
