import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RootPage } from '@pages/root';
import { RootLayoutPage } from '@pages/root-layout';
import { SearchTokenPage } from '@pages/search-token';

const router = createBrowserRouter([
  {
    element: <RootPage />,
    children: [
      {
        element: <RootLayoutPage />,
        children: [
          {
            path: '/search/',
            element: <SearchTokenPage />,
          },
        ],
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
