import { Navigate, useLoaderData } from 'react-router';

import type { SearchResultRecord } from '@entities/token';
import { routes } from '@shared/config/routes';
import { Label } from '@shared/ui/label';
import {
  TokenInterestChart,
  type TokenInterestChartDataItem,
} from '@widgets/token-interest-chart';
import type { SentimentChartDataItem } from '@widgets/token-sentiment-chart';
import { SentimentChart } from '@widgets/token-sentiment-chart';

import type { Route } from './+types/search-token-result';

export const SearchTokenResultPage = () => {
  const tokens = useLoaderData<Route.ClientLoaderData>();
  if ('error' in tokens) {
    return <Navigate to={routes.searchToken} replace />;
  }

  const tokenInfo = tokens.length > 0 ? tokens[0] : [];

  const interestData: TokenInterestChartDataItem[] =
    tokenInfo?.records?.map((item: SearchResultRecord) => ({
      date: item.timestamp,
      value: item.features.interest_normalized,
    })) ?? [];

  const sentimentData: SentimentChartDataItem[] =
    tokenInfo?.records?.map((item: SearchResultRecord) => ({
      date: item.timestamp,
      value: item.features.sentiment,
    })) ?? [];

  const query = new URLSearchParams(location.search);
  const tokenName = query.get('token') || '';

  return (
    <div className="@container/main flex flex-1 flex-col px-4 md:px-6">
      <div className="w-full mx-auto space-y-6">
        <Label className="text-2xl font-bold">
          Аналитика токена «{tokenName}»
        </Label>
        <TokenInterestChart
          data={interestData}
          title="Уровень интереса к токену"
          timeRange="90d"
          lines={{
            value: {
              label: 'Уровень интереса',
              color: 'var(--chart-1)',
            },
          }}
          className="h-[250px] w-full"
        />

        <SentimentChart
          data={sentimentData}
          title="Тональность токена"
          className="h-[250px] w-full"
        />
      </div>
    </div>
  );
};

export default SearchTokenResultPage;
