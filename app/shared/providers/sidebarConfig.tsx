'use client';

import * as React from 'react';

import {
  type SidebarConfig,
  SidebarContext,
} from '@shared/contexts/sidebarContext';

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [config, setConfig] = React.useState<SidebarConfig>({
    variant: 'inset',
    collapsible: 'offcanvas',
    side: 'left',
  });

  const updateConfig = React.useCallback(
    (newConfig: Partial<SidebarConfig>) => {
      setConfig((prev) => ({ ...prev, ...newConfig }));
    },
    [],
  );

  return (
    <SidebarContext.Provider value={{ config, updateConfig }}>
      {children}
    </SidebarContext.Provider>
  );
};
