'use client';

import dashboardScreenshot from './dashboard.png';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative pt-20 sm:pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-10 lg:flex lg:flex-col lg:justify-center lg:min-h-[500px]">
            <div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Узнай, что интересно аудитории
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl lg:mx-0">
                Анализируем интернет, чтобы показать реальные тренды, динамику
                интереса и спрос. Поможем выбрать продукт или идею, которая
                востребована на рынке
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative lg:min-h-[450px] mt-10">
            <div className="lg:absolute lg:left-0 lg:-top-50 lg:translate-x-1/12 lg:w-[130%] lg:h-[200%] lg:z-20">
              <img
                src={dashboardScreenshot}
                alt="Dashboard screenshot"
                className="w-full h-full rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
