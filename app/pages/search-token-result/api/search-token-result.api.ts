import { type SearchResultResponse, searchToken } from '@entities/token';
import { isQuery } from '@entities/token';
import { executeQuerySearch } from '@features/search-token-query';

import type { Route } from './+types/search-token-result';

export async function clientLoader({
  request,
}: Route.ClientLoaderArgs): Promise<SearchResultResponse | { error: string }> {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return { error: 'query parameter is missing' };
  }

  if (isQuery(query)) {
    const result = await executeQuerySearch(query);
    if ('error' in result) {
      return result;
    }
    return [result];
  }

  const start =
    url.searchParams.get('start') ||
    new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    ).toISOString();
  const end = url.searchParams.get('end') ?? undefined;

  return await searchToken({ token: query, start, end });
}
