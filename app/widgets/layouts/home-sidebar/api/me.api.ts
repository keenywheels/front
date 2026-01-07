import { redirect } from 'react-router';

import { useUserStore } from '@app/entities/auth';
import { routes } from '@app/shared/config/routes';

export async function clientLoader() {
  const { status } = useUserStore.getState();
  if (status === 'unknown' || status === 'guest') {
    throw redirect(`${routes.landing}?redirect_reason=auth`);
  }

  return null;
}
