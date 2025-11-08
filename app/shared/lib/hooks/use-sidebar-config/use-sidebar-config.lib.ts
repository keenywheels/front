'use client';

import * as React from 'react';

import { SidebarConfigContext } from '@shared/lib/providers/sidebar-config';

export const useSidebarConfig = () => {
  const context = React.useContext(SidebarConfigContext);

  if (!context) {
    throw new Error(
      'useSidebarConfig must be used within a SidebarConfigProvider',
    );
  }

  return context;
};
