'use client';

import * as React from 'react';
import { Link } from 'react-router-dom';

import { AlertTriangle, Search } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@shared/ui/sidebar';

import { AppSidebarNavigation } from './navigation.tsx';

const navigationItems = [
  {
    title: 'Поиск',
    url: '/search/',
    icon: Search,
  },
  {
    title: 'Алерты',
    url: '/alerts/',
    icon: AlertTriangle,
    disabled: true,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="ml-1">
            <Link to="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span className="text-3xl font-stretch-125% font-bold text-primary">
                  Vixar
                </span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarNavigation items={navigationItems} />
      </SidebarContent>
    </Sidebar>
  );
}
