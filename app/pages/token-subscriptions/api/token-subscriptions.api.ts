import {
  apiRoutes,
  GET,
  type GetUserTokenSubsParams,
  type GetUserTokenSubsResponse,
} from '@shared/api';

import type { Route } from './+types/token-subscriptions';

const ITEMS_PER_PAGE = 20;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');

  const offset = (page - 1) * ITEMS_PER_PAGE;

  const { data, error, response } = await GET(apiRoutes.tokenSubscriptions, {
    params: {
      query: {
        limit: ITEMS_PER_PAGE,
        offset: offset,
      } as GetUserTokenSubsParams,
    },
  });
  if (error !== undefined && response.status != 404) {
    return { error };
  }

  let subscriptions = data as unknown as GetUserTokenSubsResponse;
  if (response.status === 404) {
    subscriptions = [];
  }

  return {
    subscriptions: subscriptions,
    pagination: {
      page: page,
    },
  };
}
