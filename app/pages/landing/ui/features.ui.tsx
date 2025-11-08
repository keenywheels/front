'use client';

import { Bell, Clock, Settings, Zap } from 'lucide-react';

import { Card, CardContent } from '@shared/ui/card';

const values = [
  {
    title: 'Фокус на точности',
    description:
      'Мы создаем инструмент, который помогает быстро и точно понимать уровень интереса аудитории и тренды на рынке',
    icon: Zap,
  },
  {
    title: 'Данные в реальном времени',
    description:
      'Роботы обходят интернет и собирают информацию с сайтов, маркетплейсов и соцсетей, превращая ее в наглядные метрики и визуализации',
    icon: Clock,
  },
  {
    title: 'Гибкие запросы',
    description:
      'Можно кастомизировать формулы расчета уровня интереса под ваши задачи',
    icon: Settings,
  },
  {
    title: 'Уведомления',
    description:
      'Сообщим вам об изменении интереса, поможем быстро реагировать на изменения рынка и принимать эффективные решения',
    icon: Bell,
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Почему вам стоит попробовать?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Наша цель — дать вам уверенность в выборе. Мы собираем и анализируем
            данные о трендах и интересах, чтобы ваши решения опирались на факты,
            а не догадки
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-2 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="group shadow-xs py-2">
                <CardContent className="px-6 py-4">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center mb-2">
                      <Icon className="w-6 h-6 mr-2 text-primary" />
                      <h3 className="font-semibold text-balance text-xl">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-base text-justify">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
