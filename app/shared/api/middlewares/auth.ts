import type { Middleware } from 'openapi-fetch';

export const authMiddleware: Middleware = {
  async onResponse({ response }) {
    if (response.status != 401 || typeof window === 'undefined') {
      return response;
    }

    const { logout } = (await import('@entities/auth')).useUserStore.getState();
    logout();

    return response;
  },
};

export default authMiddleware;
