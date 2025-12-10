'use client';

import { useState } from 'react';
import { Link } from 'react-router';

import { Home, Menu, Search, Star } from 'lucide-react';

import { VKIDAuth } from '@features/vkid-auth';
import { routes } from '@shared/config/routes';
import { useUser } from '@shared/lib/hooks/use-user';
import { cn } from '@shared/lib/utils/cls';
import { Button } from '@shared/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@shared/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@shared/ui/sheet';

const navigationItems = [
  { name: 'Главная', href: '#hero', icon: Home },
  { name: 'Преимущества', href: '#features', icon: Star },
  { name: 'Поиск', href: routes.searchToken, icon: Search },
];

interface LandingNavbarProps {
  className?: string;
}

export const LandingNavbar = ({ className }: LandingNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useUser();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60',
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 cursor-pointer"
          >
            <span className="text-3xl font-stretch-125% font-bold">Vixar</span>
          </Link>
        </div>

        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden xl:flex items-center space-x-2">
          {isAuthenticated ? (
            <Button className="text-base cursor-pointer">
              <Link
                to={routes.searchToken}
                className="text-base cursor-pointer"
              >
                Личный кабинет
              </Link>
            </Button>
          ) : (
            <VKIDAuth containerID="vkid-desktop" />
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:w-[400px] p-0 flex flex-col"
          >
            <SheetHeader className="px-8 h-16 border-b">
              <SheetTitle className="text-lg font-semibold">
                <Link
                  to="/"
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-3xl font-stretch-125% font-bold">
                    Vixar
                  </span>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <nav className="p-6 space-y-1 flex-1 overflow-y-auto">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-2 my-4 rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && (
                    <item.icon className="h-5 w-5 xl:hidden flex-shrink-0" />
                  )}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="p-6 flex-shrink-0">
              {isAuthenticated ? (
                <Button size="lg" className="text-base cursor-pointer w-full">
                  <Link
                    to={routes.searchToken}
                    className="text-base cursor-pointer"
                  >
                    Личный кабинет
                  </Link>
                </Button>
              ) : (
                <VKIDAuth containerID="vkid-desktop" />
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
