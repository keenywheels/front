'use client';

import * as React from 'react';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { ChartContainer } from '@shared/ui/chart';

import { Tooltip } from './tooltip.ui';

export interface SentimentChartDataItem {
  date: string;
  value: number;
}

export interface SentimentChartProps {
  data: SentimentChartDataItem[];
  title: string;
  timeRange?: '7d' | '30d' | '90d';
  className?: string;
}

export function SentimentChart({
  data,
  title = 'График',
  timeRange = '7d',
  className,
}: SentimentChartProps) {
  const filteredData = React.useMemo(() => {
    if (!data?.length) return [];

    let days = 90;
    if (timeRange === '30d') days = 30;
    else if (timeRange === '7d') days = 7;

    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - days);

    return data.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate && date <= now;
    });
  }, [data, timeRange]);

  const chartData = filteredData.map((d) => ({
    date: d.date,
    positive: d.value > 0 ? d.value : 0,
    negative: d.value < 0 ? d.value : 0,
  }));

  const hasData = chartData.length > 0;

  const chartConfig = {
    positive: { label: 'Положит', color: 'var(--green)' },
    negative: { label: 'Негатив', color: 'var(--red)' },
  } satisfies Record<string, { label: string; color: string }>;

  return (
    <Card>
      <CardHeader className="flex flex-row">
        <CardTitle>{title}</CardTitle>
        <Tooltip className="ml-2" />
      </CardHeader>

      <CardContent>
        {!hasData ? (
          <div className="h-[250px] flex items-center justify-center text-sm text-muted-foreground">
            Нет данных за указанный период
          </div>
        ) : (
          <ChartContainer config={chartConfig} className={className}>
            <AreaChart
              data={chartData}
              margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
            >
              <CartesianGrid vertical />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                padding={{ left: 20 }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString('ru-RU', {
                    month: 'short',
                    day: 'numeric',
                  })
                }
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                ticks={[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]}
              />

              <Area
                type="monotone"
                dataKey="negative"
                stroke="none"
                fill="var(--red)"
                fillOpacity={0.3}
                isAnimationActive={false}
                dot={false}
                activeDot={false}
              />

              <Area
                type="monotone"
                dataKey="positive"
                stroke="none"
                fill="var(--green)"
                fillOpacity={0.3}
                isAnimationActive={false}
                dot={false}
                activeDot={false}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
