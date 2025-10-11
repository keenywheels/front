'use client';
import type { LucideIcon } from 'lucide-react';
import { Lock } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@shared/ui/sidebar';

export const AppSidebarNavigation = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    disabled?: boolean;
  }[];
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 mt-4">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                disabled={item.disabled}
                className="flex items-center gap-1"
              >
                {item.icon && <item.icon />}
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
