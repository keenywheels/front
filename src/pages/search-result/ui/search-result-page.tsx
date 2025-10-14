import { useEffect, useState } from 'react';

import axios from 'axios';

import { SidebarLayout } from '@shared/layouts/sidebar-layout.tsx';
import { AppAreaChart, type ChartDataItem } from '@widgets/area-chart';

interface DataItem {
  timestamp: number;
  features: { interest: number };
}

export const SearchResultPage = () => {
  const query = new URLSearchParams(location.search);
  const token = query.get('q') || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post<DataItem[]>(
          `${import.meta.env.APP_API_URL}/api/v1/interest/all`,
          { token },
        );

        const data: ChartDataItem[] = response.data.map((item) => ({
          date: new Date(item.timestamp * 1000).toISOString(),
          value: item.features.interest,
        }));

        setChartData(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Не удалось получить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Загрузка данных...</p>;
  if (error) return <p>{error}</p>;

  return (
    <SidebarLayout title={token}>
      <div className="@container/main flex flex-1 flex-col">
        <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 md:px-6 text-center">
          <div className="w-full max-w-md space-y-6">
            <AppAreaChart
              data={chartData}
              title={`Уровень интереса к "${token}"`}
              timeRange="90d"
              lines={[
                {
                  dataKey: 'value',
                  label: 'Интерес',
                  color: 'var(--chart-1)',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};
