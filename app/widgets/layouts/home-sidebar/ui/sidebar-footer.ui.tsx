import { ChevronUp, User2 } from 'lucide-react';

import { logoutUser, useUserStore } from '@entities/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import {
  SidebarFooter as SidebarFooterBase,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@shared/ui/sidebar';

export const SidebarFooter = () => {
  const { user, logout } = useUserStore();

  const handleLogout = async () => {
    logout();
    await logoutUser();
  };

  return (
    <SidebarFooterBase>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="text-base">
                <User2 /> {user?.username}
                <ChevronUp className="w-4 h-4 text-muted-foreground ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[var(--radix-popper-anchor-width)]"
            >
              <DropdownMenuItem onClick={handleLogout}>
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterBase>
  );
};
