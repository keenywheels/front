import { apiRoutes } from '@app/shared/config/routes';
import { client } from '@shared/api/client';

export const getMe = async () => {
  return client.GET(apiRoutes.getMe);
};
