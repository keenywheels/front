import { useLoaderData } from 'react-router';

import type { SearchResultDataItem } from '@pages/searchResultPage/models/models';
import { AreaChart, type ChartDataItem } from '@widgets/areaChart';

import type { Route } from './+types/searchResult';

export const SearchResultPage = () => {
  const { data } = useLoaderData<Route.ClientLoaderData>();

  const chartData: ChartDataItem[] = data.map((item: SearchResultDataItem) => ({
    date: new Date(item.timestamp * 1000).toISOString(),
    value: item.features.interest,
  }));

  const query = new URLSearchParams(location.search);
  const token = query.get('q') || '';

  return (
    <div className="@container/main flex flex-1 flex-col">
      <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 md:px-6 text-center">
        <div className="w-full max-w-md space-y-6">
          <AreaChart
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
  );
};

export default SearchResultPage;
