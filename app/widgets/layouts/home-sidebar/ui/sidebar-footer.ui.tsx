import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ChevronUp, User2 } from 'lucide-react';

import { useUserStore } from '@entities/auth';
import { apiRoutes, POST } from '@shared/api';
import { routes } from '@shared/config/routes';
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
import { Spinner } from '@shared/ui/spinner';

export const SidebarFooter = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useUserStore();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await POST(apiRoutes.logoutUser);
    } finally {
      setIsLoading(false);
    }

    logout();
    navigate(routes.landing);
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
                {isLoading ? <Spinner className="w-4 h-4" /> : 'Выйти'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterBase>
  );
};
