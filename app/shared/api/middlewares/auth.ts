import type { Middleware } from 'openapi-fetch';
import { toast } from 'sonner';

import { routes } from '@shared/config/routes';

export const authMiddleware: Middleware = {
  async onResponse({ response }) {
    if (response.status != 401 || typeof window === 'undefined') {
      return response;
    }

    window.dispatchEvent(new CustomEvent('logout-user'));

    window.dispatchEvent(
      new CustomEvent('redirect', {
        detail: {
          path: routes.landing,
        },
      }),
    );

    toast.warning(
      'Вы не можете выполнить это действие. Авторизуйтесь и попробуйте снова',
    );

    return response;
  },
};

export default authMiddleware;
