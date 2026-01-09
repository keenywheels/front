import React from 'react';
import { Outlet } from 'react-router';

import { Bell, Clock, Search } from 'lucide-react';

import { routes } from '@shared/config/routes';
import { useSidebarConfig } from '@shared/lib/hooks/use-sidebar-config';
import { SidebarProvider } from '@shared/ui/sidebar';
import { clientLoader, HomeSidebar } from '@widgets/layouts/home-sidebar';

const navigationItems = [
  { title: 'Поиск', url: routes.searchToken, icon: Search },
  { title: 'Сохраненные', url: routes.savedQueries, icon: Clock },
  { title: 'Подписки', url: routes.tokenSubscriptions, icon: Bell },
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

export { clientLoader };
export default HomeLayout;
