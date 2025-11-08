import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/landing.tsx'),

  route('home', 'routes/home-layout.tsx', [
    route('search', 'routes/search-token.tsx'),
    route('search/result', 'routes/search-token-result.tsx'),
  ]),
] satisfies RouteConfig;
