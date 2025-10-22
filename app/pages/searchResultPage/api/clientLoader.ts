import axios, { AxiosError } from 'axios';

import { apiRoutes } from '@shared/config/routes';

import type { SearchResultData, SearchResultDataItem } from '../models/models';

import type { Route } from './+types/searchResult';

type SearchResultParams = {
  q: string;
};

type SearchResultRequest = {
  token: string;
};

type SearchResultResponse = SearchResultDataItem[];

export async function clientLoader({
  request,
}: Route.ClientLoaderArgs): Promise<SearchResultData> {
  const url = new URL(request.url);

  const params: SearchResultParams = {
    q: url.searchParams.get('q') || '',
  };
  if (!params.q) {
    throw new Response('missing query parameter: q', { status: 400 });
  }

  const requestBody: SearchResultRequest = { token: params.q };

  try {
    const response = await axios.post<SearchResultResponse>(
      apiRoutes.interestAll,
      requestBody,
    );
    return { data: response.data };
  } catch (error) {
    const err = error as AxiosError;
    console.error('search result request failed:', err.message);
    throw new Response('search result request failed', { status: 500 });
  }
}
