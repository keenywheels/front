import { type SearchResultResponse } from '@entities/token';

export const searchResultResponseMock: SearchResultResponse = [
  {
    token: 'чип',
    records: [
      {
        timestamp: '2025-10-15',
        features: {
          interest: 384,
          interest_normalized: 0.6666666666666666,
          sentiment: 50,
        },
      },
      {
        timestamp: '2025-10-16',
        features: {
          interest: 448,
          interest_normalized: 0.7777777777777778,
          sentiment: 24,
        },
      },
      {
        timestamp: '2025-10-17',
        features: {
          interest: 512,
          interest_normalized: 0.8888888888888888,
          sentiment: 29,
        },
      },
      {
        timestamp: '2025-10-18',
        features: {
          interest: 576,
          interest_normalized: 1,
          sentiment: -13,
        },
      },
      {
        timestamp: '2025-10-19',
        features: {
          interest: 480,
          interest_normalized: 0.8333333333333334,
          sentiment: -22,
        },
      },
      {
        timestamp: '2025-10-20',
        features: {
          interest: 528,
          interest_normalized: 0.9166666666666666,
          sentiment: 17,
        },
      },
    ],
  },
];
