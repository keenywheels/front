import { redirect } from 'react-router';

import { toast } from 'sonner';

import { isQuery } from '@entities/token';
import { executeQuerySearch } from '@features/search-token-query';
import { apiRoutes, POST } from '@shared/api';
import type { SearchTokenInfoRequest } from '@shared/api/models';
import { routes } from '@shared/config/routes';

import type { Route } from './+types/search-token-result';

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    toast.warning(
      'Мы не смогли ничего найти по вашему запросу. Пробоуйте что-то другое',
    );
    throw redirect(routes.searchToken);
  }

  if (isQuery(query)) {
    const result = await executeQuerySearch(query);
    if ('error' in result || !result?.records?.length) {
      toast.warning(
        'Мы не смогли ничего найти по вашему запросу. Пробоуйте что-то другое',
      );
      throw redirect(routes.searchToken);
    }
    return [result];
  }

  const start =
    url.searchParams.get('start') ||
    new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    ).toISOString();
  const end = url.searchParams.get('end') ?? undefined;

  return await POST(apiRoutes.searchToken, {
    body: {
      token: query,
      start: start,
      end: end,
    } as SearchTokenInfoRequest,
  });
}
