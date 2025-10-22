import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import { Providers } from '@shared/providers/providers';

import type { Route } from './+types/root';

import './app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Vixar</title>
        <meta
          name="title"
          content="Vixar — аналитика интересов аудитории и трендов"
        />
        <meta
          name="description"
          content="Анализируем интернет, собираем данные об интересах аудитории и визуализируем динамику трендов. Помогаем стартапам, маркетологам и инвесторам принимать решения на основе реальных данных, а не интуиции"
        />

        <link rel="canonical" href="https://vixar.tech/" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vixar" />
        <meta
          property="og:title"
          content="Аналитика интересов аудитории и трендов"
        />
        <meta
          property="og:description"
          content="Анализируем интернет, собираем данные об интересах аудитории и визуализируем динамику трендов. Помогаем стартапам, маркетологам и инвесторам принимать решения на основе реальных данных, а не интуиции"
        />
        <meta property="og:url" content="https://vixar.tech/" />

        <Meta />
        <Links />
      </head>
      <body>
        <Providers>{children}</Providers>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export const App = () => {
  return <Outlet />;
};

export default App;

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
};
