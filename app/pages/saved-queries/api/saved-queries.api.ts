import {
  apiRoutes,
  GET,
  type GetUserQueriesParams,
  type GetUserQueriesResponse,
} from '@shared/api';

import type { Route } from './+types/saved-queries';

const ITEMS_PER_PAGE = 20;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');

  const offset = (page - 1) * ITEMS_PER_PAGE;

  const { data, error } = await GET(apiRoutes.savedQueries, {
    params: {
      query: {
        limit: ITEMS_PER_PAGE,
        offset: offset,
      } as GetUserQueriesParams,
    },
  });
  if (error !== undefined) {
    return { error };
  }
  const queries = data as unknown as GetUserQueriesResponse;

  return {
    queries: queries,
    pagination: {
      page: page,
    },
  };
}
