'use client';

import * as React from 'react';

import {
  type SidebarConfig,
  SidebarConfigContext,
} from './sidebar-config.context';

export const SidebarConfigProvider = ({
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
    <SidebarConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </SidebarConfigContext.Provider>
  );
};
