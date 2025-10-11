'use client';
import { BrowserRouter } from 'react-router-dom';

import { Router } from '@shared/lib/router';
import { SidebarConfigProvider } from '@shared/ui/sidebar-provider';
import { ThemeProvider } from '@shared/ui/theme-provider';

import { routes } from './routes';

const basename = import.meta.env.VITE_BASENAME || '';

export const App = () => {
  return (
    <div
      className="font-sans antialiased"
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <SidebarConfigProvider>
          <BrowserRouter basename={basename}>
            <Router routes={routes} />
          </BrowserRouter>
        </SidebarConfigProvider>
      </ThemeProvider>
    </div>
  );
};
