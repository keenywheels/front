import {
  Navigate,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';

import type { SearchResult, SearchResultRecord } from '@entities/token';
import { SearchTokenQuery } from '@features/search-token-query';
import { routes } from '@shared/config/routes';
import { Card, CardContent, CardHeader } from '@shared/ui/card';
import { Label } from '@shared/ui/label';
import { Skeleton } from '@shared/ui/skeleton';
import {
  TokenInterestChart,
  type TokenInterestChartDataItem,
} from '@widgets/token-interest-chart';
import {
  SentimentChart,
  type SentimentChartDataItem,
} from '@widgets/token-sentiment-chart';

import type { Route } from './+types/search-token-result';

const ResultSkeletons = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[250px] w-full" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[250px] w-full" />
      </CardContent>
    </Card>
  </div>
);

export const SearchTokenResultPage = () => {
  const loaderData = useLoaderData<Route.ClientLoaderData>();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const isLoading = navigation.state === 'loading';

  if ('error' in loaderData) {
    console.error('loader error:', loaderData.error);
    return <Navigate to={routes.searchToken} replace />;
  }

  const tokenInfo: SearchResult =
    loaderData.length > 0 ? loaderData[0] : { token: query, records: [] };

  const interestData: TokenInterestChartDataItem[] = tokenInfo.records.map(
    (item: SearchResultRecord) => ({
      date: item.timestamp,
      value: item.features.interest_normalized,
    }),
  );

  const sentimentData: SentimentChartDataItem[] = tokenInfo.records.map(
    (item: SearchResultRecord) => ({
      date: item.timestamp,
      value: item.features.sentiment,
    }),
  );

  return (
    <div className="@container/main flex flex-1 flex-col px-4 md:px-6">
      <div className="w-full mx-auto space-y-6">
        <Label className="text-2xl font-bold">Аналитика "{query}"</Label>
        <SearchTokenQuery />

        {isLoading ? (
          <ResultSkeletons />
        ) : (
          <>
            <TokenInterestChart
              data={interestData}
              title="Уровень интереса"
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
              title="Настроение аудитории"
              className="h-[250px] w-full"
            />
          </>
        )}
      </div>
    </div>
  );
};
