import type {
  SearchResultRequest,
  SearchResultResponse,
} from '@entities/token';
import { mockRequest, request, withDefault } from '@shared/api';
import { apiRoutes } from '@shared/config/routes';

import { searchResultResponseMock } from './search.mock';

export async function searchToken({ token, start, end }: SearchResultRequest) {
  const mock = await mockRequest<SearchResultResponse>(
    searchResultResponseMock,
  );
  if (mock) {
    return mock;
  }

  return withDefault(
    request<SearchResultRequest, SearchResultResponse>(
      apiRoutes.searchToken,
      'post',
      { token, start, end },
    ),
    [],
  );
}
