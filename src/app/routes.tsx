import { lazy } from 'react';

import type { RouteConfig } from '@shared/lib/router';

const LandingPage = lazy(() => import('@pages/landing'));
const SearchTokenPage = lazy(() => import('@pages/search-token'));
const SearchResultPage = lazy(() => import('@pages/search-result'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/search/',
    element: <SearchTokenPage />,
  },
  {
    path: '/search/result/',
    element: <SearchResultPage />,
  },
];
