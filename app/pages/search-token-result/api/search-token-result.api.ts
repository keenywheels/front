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
  const category = url.searchParams.get('category') ?? undefined;

  const start =
    url.searchParams.get('start') ||
    new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    ).toISOString();

  if (!query) {
    toast.warning(
      'Мы не смогли ничего найти по вашему запросу. Пробоуйте что-то другое',
    );
    throw redirect(routes.searchToken);
  }

  if (isQuery(query)) {
    const result = await executeQuerySearch(query, start);
    if ('error' in result || !result?.records?.length) {
      toast.warning(
        'Мы не смогли ничего найти по вашему запросу. Пробоуйте что-то другое',
      );
      throw redirect(routes.searchToken);
    }
    return [result];
  }

  return await POST(apiRoutes.searchToken, {
    body: {
      token: query,
      category: category,
      start: start,
    } as SearchTokenInfoRequest,
  });
}
