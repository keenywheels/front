'use client';

import { Button } from '@shared/ui/button';
import { SmoothLink } from '@shared/ui/smooth-link.tsx';

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-20 sm:pt-32 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Узнай, что действительно интересно аудитории
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Анализируем интернет, чтобы показать реальные тренды, динамику
            интереса и спрос. Поможем выбрать продукт или идею, которая
            востребована на рынке
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base cursor-pointer" asChild>
              <SmoothLink
                key="Попробовать"
                to="/search/"
                className="text-base cursor-pointer"
              >
                Попробовать
              </SmoothLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
