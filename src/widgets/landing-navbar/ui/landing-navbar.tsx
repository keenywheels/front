'use client';

import { useState } from 'react';

import { Home, Menu, Search, Star } from 'lucide-react';

import { Button } from '@shared/ui/button.tsx';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@shared/ui/navigation-menu.tsx';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@shared/ui/sheet.tsx';
import { SmoothLink } from '@shared/ui/smooth-link.tsx';

const navigationItems = [
  { name: 'Главная', href: '#hero', icon: Home },
  { name: 'Преимущества', href: '#features', icon: Star },
  { name: 'Поиск', href: '/search/', icon: Search },
];

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <SmoothLink
            to="/"
            className="flex items-center space-x-2 px-4 cursor-pointer"
          >
            <span className="text-3xl font-stretch-125% font-bold text-primary">
              Vixar
            </span>
          </SmoothLink>
        </div>

        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <SmoothLink
                    to={item.href}
                    className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer"
                  >
                    {item.name}
                  </SmoothLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden xl:flex items-center space-x-2">
          <Button asChild className="cursor-pointer">
            <SmoothLink to="/search/">Попробовать</SmoothLink>
          </Button>
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
                <SmoothLink
                  to="/"
                  className="flex items-center space-x-2 cursor-pointer"
                  onNavigateEnd={() => setIsOpen(false)}
                >
                  <span className="text-3xl font-stretch-125% font-bold text-primary">
                    Vixar
                  </span>
                </SmoothLink>
              </SheetTitle>
            </SheetHeader>

            <nav className="p-6 space-y-1 flex-1 overflow-y-auto">
              {navigationItems.map((item) => (
                <SmoothLink
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-2 my-4 rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onNavigateEnd={() => setIsOpen(false)}
                >
                  {item.icon && (
                    <item.icon className="h-5 w-5 xl:hidden flex-shrink-0" />
                  )}
                  <span>{item.name}</span>
                </SmoothLink>
              ))}
            </nav>

            <div className="p-6 flex-shrink-0">
              <Button asChild className="w-full">
                <SmoothLink
                  to="/search/"
                  onNavigateEnd={() => setIsOpen(false)}
                  className="w-full text-center"
                >
                  Попробовать
                </SmoothLink>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
