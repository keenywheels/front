'use client';

import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Spinner } from '@shared/ui/spinner';
import { ThemeProvider } from '@shared/ui/theme-provider';

const LandingPage = lazy(() => import('@pages/landing'));
const SearchTokenPage = lazy(() => import('@pages/search-token'));
const RootPage = lazy(() => import('@pages/root'));
const RootLayoutPage = lazy(() => import('@pages/root-layout'));

const router = createBrowserRouter([
  {
    element: <RootPage />,
    children: [
      {
        element: <RootLayoutPage />,
        children: [
          { path: '/', element: <LandingPage /> },
          { path: '/search/', element: <SearchTokenPage /> },
        ],
      },
    ],
  },
]);

export const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Spinner className="w-6 h-6 text-primary" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
};
