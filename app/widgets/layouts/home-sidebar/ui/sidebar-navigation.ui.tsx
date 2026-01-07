'use client';
import * as React from 'react';
import { NavLink } from 'react-router';

import { Lock } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@shared/ui/sidebar';

import type { SidebarItem } from './sidebar-item.ui';

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
              <NavLink to={item.url}>
                {({ isActive }) => (
                  <SidebarMenuButton
                    isActive={isActive && !item.disabled}
                    tooltip={item.title}
                    disabled={item.disabled}
                    className="flex items-center gap-2 text-sm min-h-[35px]"
                  >
                    {item.icon && <item.icon className="w-6 h-6" />}
                    {item.title}
                    {item.disabled && (
                      <Lock className="w-4 h-4 text-muted-foreground ml-auto" />
                    )}
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
