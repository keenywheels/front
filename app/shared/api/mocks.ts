import { apiRoutes } from '@shared/api/routes';

export const mockFetch = async (input: RequestInfo, init?: RequestInit) => {
  const url = input.url;

  if (url.includes(apiRoutes.searchToken)) {
    return new Response(
      JSON.stringify([
        {
          token: 'россия',
          category: 'news',
          records: [
            {
              timestamp: '2025-11-30',
              features: {
                interest: 153,
                interest_normalized: 76.5,
                sentiment: -38,
              },
            },
            {
              timestamp: '2025-12-01',
              features: {
                interest: 58,
                interest_normalized: 29,
                sentiment: -33,
              },
            },
            {
              timestamp: '2025-12-02',
              features: {
                interest: 36,
                interest_normalized: 18,
                sentiment: -12,
              },
            },
            {
              timestamp: '2025-12-03',
              features: {
                interest: 191,
                interest_normalized: 47.75,
                sentiment: -24,
              },
            },
            {
              timestamp: '2025-12-04',
              features: {
                interest: 124,
                interest_normalized: 62,
                sentiment: -36,
              },
            },
            {
              timestamp: '2025-12-05',
              features: {
                interest: 51,
                interest_normalized: 25.5,
                sentiment: -20,
              },
            },
            {
              timestamp: '2025-12-06',
              features: {
                interest: 147,
                interest_normalized: 73.5,
                sentiment: -65,
              },
            },
            {
              timestamp: '2025-12-07',
              features: {
                interest: 24,
                interest_normalized: 12,
                sentiment: -31,
              },
            },
            {
              timestamp: '2025-12-08',
              features: {
                interest: 51,
                interest_normalized: 25.5,
                sentiment: -35,
              },
            },
            {
              timestamp: '2025-12-09',
              features: {
                interest: 43,
                interest_normalized: 21.5,
                sentiment: -33,
              },
            },
            {
              timestamp: '2025-12-10',
              features: {
                interest: 135,
                interest_normalized: 67.5,
                sentiment: 31,
              },
            },
            {
              timestamp: '2025-12-11',
              features: {
                interest: 53,
                interest_normalized: 26.5,
                sentiment: -24,
              },
            },
            {
              timestamp: '2025-12-12',
              features: {
                interest: 36,
                interest_normalized: 18,
                sentiment: -35,
              },
            },
            {
              timestamp: '2025-12-13',
              features: {
                interest: 32,
                interest_normalized: 16,
                sentiment: -20,
              },
            },
          ],
        },
      ]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  return fetch(input, init);
};
