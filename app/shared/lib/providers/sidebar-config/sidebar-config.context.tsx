'use client';

import * as React from 'react';

export interface SidebarConfig {
  side: 'left' | 'right';
  collapsible: 'none' | 'offcanvas' | 'icon' | undefined;
  variant: 'sidebar' | 'floating' | 'inset';
}

export interface SidebarConfigContextValue {
  config: SidebarConfig;
  updateConfig: (config: Partial<SidebarConfig>) => void;
}

export const SidebarConfigContext =
  React.createContext<SidebarConfigContextValue | null>(null);
