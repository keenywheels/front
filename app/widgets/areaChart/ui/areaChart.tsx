'use client';

import * as React from 'react';

import {
  Area,
  AreaChart as BaseAreaChart,
  CartesianGrid,
  XAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@shared/ui/chart';

export interface ChartDataItem {
  date: string;
  [key: string]: string | number;
}

export interface ChartLineConfig {
  dataKey: string;
  label: string;
  color: string;
}

interface AppAreaChartProps {
  data: ChartDataItem[];
  title?: string;
  timeRange?: '7d' | '30d' | '90d';
  lines: ChartLineConfig[];
}

export const AreaChart: React.FC<AppAreaChartProps> = ({
  data,
  title = 'График',
  timeRange = '90d',
  lines,
}) => {
  const filteredData = React.useMemo(() => {
    if (!data.length) return [];

    const latestDate = new Date(data[data.length - 1].date);
    let days = 90;
    if (timeRange === '30d') days = 30;
    else if (timeRange === '7d') days = 7;

    const startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - days);

    return data.filter((item) => new Date(item.date) >= startDate);
  }, [data, timeRange]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={{}} className="aspect-auto h-[250px] w-full">
          <BaseAreaChart data={filteredData}>
            <defs>
              {lines.map((line) => (
                <linearGradient
                  key={line.dataKey}
                  id={`fill-${line.dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={line.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={line.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('ru-RU', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString('ru-RU', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                  indicator="dot"
                />
              }
            />
            {lines.map((line) => (
              <Area
                key={line.dataKey}
                dataKey={line.dataKey}
                type="natural"
                stroke={line.color}
                fill={`url(#fill-${line.dataKey})`}
              />
            ))}
          </BaseAreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
