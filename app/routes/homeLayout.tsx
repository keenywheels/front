import React from 'react';
import { Outlet } from 'react-router';

import { AlertTriangle, Search } from 'lucide-react';

import { routes } from '@shared/config/routes';
import { useSidebarConfig } from '@shared/hooks/useSidebarConfig';
import { SidebarProvider } from '@shared/ui/sidebar';
import { HomeSidebar } from '@widgets/homeSidebar';

const navigationItems = [
  { title: 'Поиск', url: routes.searchToken, icon: Search },
  { title: 'Алерты', url: '#', icon: AlertTriangle, disabled: true },
];

const HomeLayout = () => {
  const { config } = useSidebarConfig();

  return (
    <SidebarProvider
      style={
        {
          '--header-height': 'calc(var(--spacing) * 14)',
        } as React.CSSProperties
      }
    >
      <HomeSidebar
        title="Панель"
        navigationItems={navigationItems}
        side={config.side}
        collapsible={config.collapsible}
        variant={config.variant}
      >
        <Outlet />
      </HomeSidebar>
    </SidebarProvider>
  );
};

export default HomeLayout;
