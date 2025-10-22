'use client';

import * as React from 'react';

import { SidebarContext } from '@shared/contexts/sidebarContext';

export const useSidebarConfig = () => {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error(
      'useSidebarConfig must be used within a SidebarConfigProvider',
    );
  }

  return context;
};
