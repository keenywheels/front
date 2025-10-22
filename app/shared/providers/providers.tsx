'use client';

import * as React from 'react';

import { SidebarProvider } from '@shared/providers/sidebarConfig';
import { ThemeProvider } from '@shared/providers/themeProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
};
