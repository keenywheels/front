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

export interface TokenInterestChartDataItem {
  date: string;
  [key: string]: string | number;
}

export interface TokenInterestChartLine {
  label: string;
  color: string;
}

export interface TokenInterestChartProps {
  data: TokenInterestChartDataItem[];
  title?: string;
  timeRange?: '7d' | '30d' | '90d';
  lines: Record<string, TokenInterestChartLine>;
  className?: string;
}

export const TokenInterestChart: React.FC<TokenInterestChartProps> = ({
  data,
  title = 'График',
  timeRange = '90d',
  lines,
  className,
}) => {
  const filteredData = React.useMemo(() => {
    if (!data?.length) return [];

    const latestDate = new Date(data[data.length - 1].date);
    let days = 90;
    if (timeRange === '30d') days = 30;
    else if (timeRange === '7d') days = 7;

    const startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - days);

    return data.filter((item) => new Date(item.date) >= startDate);
  }, [data, timeRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={lines} className={className}>
          <BaseAreaChart data={filteredData}>
            <defs>
              {Object.entries(lines).map(([dataKey, { color }]) => (
                <linearGradient
                  key={dataKey}
                  id={`fill-${dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid vertical={true} />
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
            {Object.entries(lines).map(([dataKey, { color }]) => (
              <Area
                key={dataKey}
                dataKey={dataKey}
                name={lines[dataKey].label}
                type="natural"
                stroke={color}
                fill={`url(#fill-${dataKey})`}
              />
            ))}
          </BaseAreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
