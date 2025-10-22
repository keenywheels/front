'use client';

import * as React from 'react';
import { Link } from 'react-router';

import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@shared/ui/sidebar';

import type { SidebarItem } from './sidebarItem';
import { SidebarNavigation } from './sidebarNavigation';

interface SidebarProps extends React.ComponentProps<typeof BaseSidebar> {
  navigationItems: SidebarItem[];
}

export const Sidebar = ({ navigationItems, ...props }: SidebarProps) => {
  return (
    <BaseSidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="ml-1">
            <Link to="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span className="text-3xl font-stretch-125% font-bold">
                  Vixar
                </span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation navigationItems={navigationItems} />
      </SidebarContent>
    </BaseSidebar>
  );
};
