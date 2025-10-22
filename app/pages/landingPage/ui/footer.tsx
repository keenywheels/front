'use client';

import { Link } from 'react-router';

import { routes } from '@shared/config/routes';

const footerItems = [
  { name: 'Главная', href: '#hero' },
  { name: 'Преимущества', href: '#features' },
  { name: 'Поиск', href: routes.searchToken },
];

export const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-black py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-300">
          <span>
            Сделано командой{' '}
            <span className="font-bold text-white">NovaCode</span>
          </span>

          <div className="flex items-center gap-6">
            {footerItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:text-white hover:underline cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
