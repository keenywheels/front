'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { ChartContainer } from '@shared/ui/chart';

export interface SentimentChartDataItem {
  date: string;
  value: number;
}

export interface SentimentChartProps {
  data: SentimentChartDataItem[];
  title: string;
  className?: string;
}

export function SentimentChart({
  data,
  title = 'График',
  className,
}: SentimentChartProps) {
  const chartData = data.map((d) => ({
    date: d.date,
    positive: d.value > 0 ? d.value : 0,
    negative: d.value < 0 ? d.value : 0,
  }));

  const chartConfig = {
    positive: { label: 'Положит', color: 'var(--green)' },
    negative: { label: 'Негатив', color: 'var(--red)' },
  } satisfies Record<string, { label: string; color: string }>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={className}>
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={true} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              padding={{ left: 20 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('ru-RU', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
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
            />

            <Area
              type="monotone"
              dataKey="positive"
              stroke="none"
              fill="var(--green)"
              fillOpacity={0.3}
              isAnimationActive={false}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
