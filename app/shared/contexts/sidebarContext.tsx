'use client';

import * as React from 'react';

export interface SidebarConfig {
  side: 'left' | 'right';
  collapsible: 'none' | 'offcanvas' | 'icon' | undefined;
  variant: 'sidebar' | 'floating' | 'inset';
}

export interface SidebarContextValue {
  config: SidebarConfig;
  updateConfig: (config: Partial<SidebarConfig>) => void;
}

export const SidebarContext = React.createContext<SidebarContextValue | null>(
  null,
);
