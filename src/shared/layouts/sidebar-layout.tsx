'use client';

import * as React from 'react';

import { useSidebarConfig } from '@shared/hooks/use-sidebar-config';
import { SidebarInset, SidebarProvider } from '@shared/ui/sidebar';
import { AppSidebar, AppSidebarHeader } from '@widgets/app-sidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function SidebarLayout({ children, title }: SidebarLayoutProps) {
  const { config } = useSidebarConfig();

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '16rem',
          '--sidebar-width-icon': '3rem',
          '--header-height': 'calc(var(--spacing) * 14)',
        } as React.CSSProperties
      }
      className={config.collapsible === 'none' ? 'sidebar-none-mode' : ''}
    >
      {config.side === 'left' ? (
        <>
          <AppSidebar
            variant={config.variant}
            collapsible={config.collapsible}
            side={config.side}
          />
          <SidebarInset>
            <AppSidebarHeader title={title} />
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
            <AppSidebarHeader title={title} />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
          <AppSidebar
            variant={config.variant}
            collapsible={config.collapsible}
            side={config.side}
          />
        </>
      )}
    </SidebarProvider>
  );
}
