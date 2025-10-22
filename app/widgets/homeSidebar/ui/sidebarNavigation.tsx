'use client';
import * as React from 'react';

import { Lock } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@shared/ui/sidebar';

import type { SidebarItem } from './sidebarItem';

interface SidebarNavigationProps {
  navigationItems: SidebarItem[];
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  navigationItems,
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 mt-4">
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                disabled={item.disabled}
                className="flex items-center gap-1 font-semibold"
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                <span className="ml-1">{item.title}</span>
                {item.disabled && (
                  <Lock className="w-4 h-4 text-muted-foreground ml-auto" />
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
