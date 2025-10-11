'use client';

import { SmoothLink } from '@shared/ui/smooth-link';

const footerItems = [
  { name: 'Главная', href: '#hero' },
  { name: 'Преимущества', href: '#features' },
  { name: 'Поиск', href: '/search/' },
];

export const FooterSection = () => {
  return (
    <footer className="border-t border-border py-6 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            Создано командой{' '}
            <span className="font-semibold text-foreground">NovaCode</span>
          </span>

          <div className="flex items-center gap-6">
            {footerItems.map((item) => (
              <SmoothLink
                key={item.name}
                to={item.href}
                className="text-foreground hover:underline cursor-pointer"
              >
                {item.name}
              </SmoothLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
