import {
  type SearchResultRequest,
  type SearchResultResponse,
  searchToken,
} from '@entities/token';

import type { Route } from './+types/search-token-result';

export async function clientLoader({
  request,
}: Route.ClientLoaderArgs): Promise<SearchResultResponse | { error: string }> {
  const url = new URL(request.url);

  const token = url.searchParams.get('token');
  if (!token) {
    throw new Response('missing query parameter: token', { status: 400 });
  }

  let start = url.searchParams.get('start');
  if (!start) {
    const now = new Date();
    const lastYear = new Date(now);
    lastYear.setFullYear(now.getFullYear() - 1);
    start = lastYear.toISOString();
  }

  const end = url.searchParams.get('end') ?? undefined;

  const body: SearchResultRequest = {
    token: token,
    start: start,
    end: end,
  };

  return await searchToken(body);
}
