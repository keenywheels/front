import createClient from 'openapi-fetch';

import { MOCK_API } from '@shared/config/consts';
import { API_URL } from '@shared/config/routes';

import type { paths } from './gen/v1';
import authMiddleware from './middlewares/auth';
import { mockFetch } from './mocks';

export const client = createClient<paths>({
  baseUrl: API_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  fetch: MOCK_API ? mockFetch : fetch,
});

client.use(authMiddleware);

export const { GET, POST, PUT, DELETE } = client;
