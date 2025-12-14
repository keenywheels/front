import {
  Navigate,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';

import { useSavedQueriesStore } from '@entities/auth/store/query.store';
import type { SearchResult, SearchResultRecord } from '@entities/token';
import { SearchTokenQuery } from '@features/search-token-query';
import {
  apiRoutes,
  DELETE,
  type DeleteUserQueryParams,
  POST,
  type SaveUserQueryRequest,
  type SaveUserQueryResponse,
} from '@shared/api';
import { routes } from '@shared/config/routes';
import { Button } from '@shared/ui/button';
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

  const { isQuerySaved, saveQuery, removeQuery, getQueryID } =
    useSavedQueriesStore();

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

  const handleSaveQuery = async (query: string) => {
    const isSaved = isQuerySaved(query);
    const queryID = getQueryID(query);

    if (isSaved) {
      const { error } = await DELETE(apiRoutes.savedQueries, {
        params: {
          query: { id: queryID } as unknown as DeleteUserQueryParams,
        },
      });
      if (error) {
        toast.error(
          'Не получилось удалить сохраненный запрос. Попробуйте позже',
        );
        return;
      }
      removeQuery(query);
    } else {
      const { data, error } = await POST(apiRoutes.savedQueries, {
        body: { query } as SaveUserQueryRequest,
      });
      if (error) {
        toast.error('Не получилось сохранить запрос. Попробуйте позже');
        return;
      }
      const response = data as unknown as SaveUserQueryResponse;
      saveQuery(response.id, query);
    }
  };

  return (
    <div className="@container/main flex flex-1 flex-col px-4 md:px-6">
      <div className="w-full mx-auto space-y-6">
        <div className="flex items-center">
          <Label className="text-2xl font-bold">Аналитика: {query}</Label>

          <Button
            variant="default"
            size="icon-sm"
            onClick={() => handleSaveQuery(query)}
            className="bg-transparent text-foreground hover:bg-muted hover:text-foreground ml-2"
          >
            {isQuerySaved(query) ? (
              <BookmarkCheck className="h-6 w-6" />
            ) : (
              <Bookmark className="h-6 w-6" />
            )}
          </Button>
        </div>

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
