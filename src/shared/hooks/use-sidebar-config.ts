'use client';

import * as React from 'react';

import { SidebarContext } from '@shared/contexts/sidebar-context';

export function useSidebarConfig() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error(
      'useSidebarConfig must be used within a SidebarConfigProvider',
    );
  }

  return context;
}
