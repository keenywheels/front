import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/landing.tsx'),

  route('home', 'routes/homeLayout.tsx', [
    route('search', 'routes/searchToken.tsx'),
    route('search/result', 'routes/searchResult.tsx'),
  ]),
] satisfies RouteConfig;
