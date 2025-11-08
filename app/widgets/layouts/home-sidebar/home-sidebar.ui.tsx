'use client';

import * as React from 'react';

import { SidebarInset } from '@shared/ui/sidebar';

import { Sidebar } from './ui/sidebar.ui';
import { SidebarHeader } from './ui/sidebar-header.ui';
import type { SidebarItem } from './ui/sidebar-item.ui';

interface HomeSidebarProps {
  navigationItems?: SidebarItem[];
  children?: React.ReactNode;
  title?: string;
  side?: 'left' | 'right';
  collapsible?: 'none' | 'offcanvas' | 'icon' | undefined;
  variant?: 'sidebar' | 'floating' | 'inset';
}

export const HomeSidebar: React.FC<HomeSidebarProps> = ({
  navigationItems = [],
  children,
  title,
  side = 'left',
  collapsible = 'none',
  variant = 'sidebar',
}) => {
  return (
    <>
      {side === 'left' ? (
        <>
          <Sidebar
            navigationItems={navigationItems}
            variant={variant}
            collapsible={collapsible}
            side={side}
          />
          <SidebarInset>
            <SidebarHeader title={title} />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
        </>
      ) : (
        <>
          <SidebarInset>
            <SidebarHeader title={title} />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
          <Sidebar
            navigationItems={navigationItems}
            variant={variant}
            collapsible={collapsible}
            side={side}
          />
        </>
      )}
    </>
  );
};
