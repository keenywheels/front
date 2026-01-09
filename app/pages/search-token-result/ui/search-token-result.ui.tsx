import { useState } from 'react';
import {
  Navigate,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';

import { Bell, BellRing, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';

import { useTokenSubscriptionsStore } from '@app/entities/token-subscription';
import type { DeleteUserTokenSubParams } from '@app/shared/api/models';
import { useSavedQueriesStore } from '@entities/auth/store/query.store';
import { isQuery, type SearchResultRecord } from '@entities/token';
import { SearchTokenQuery } from '@features/search-token-query';
import { TokenSubscribeDialog } from '@features/token-subscribe-dialog';
import {
  apiRoutes,
  DELETE,
  type DeleteUserQueryParams,
  POST,
  type SaveUserQueryRequest,
  type SaveUserQueryResponse,
  type TokenInfo,
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
import { IntervalSelect } from './interval-select.ui';

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

  const interval = searchParams.get('interval') ?? '7d';

  const { isQuerySaved, saveQuery, removeQuery, getQueryID } =
    useSavedQueriesStore();

  const { isTokenSubscribed, getSubscriptionID, unsubscribe } =
    useTokenSubscriptionsStore();
  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false);

  if ('error' in loaderData && loaderData.response.status !== 404) {
    console.error('loader error:', loaderData.error);
    return <Navigate to={routes.searchToken} replace />;
  }

  const tokenInfo: TokenInfo =
    loaderData.data.length > 0
      ? loaderData.data[0]
      : { token: query, records: [] };

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

  const handleTokenSubscribe = async (token: string) => {
    const isSubscribed = isTokenSubscribed(token);
    const subscriptionID = getSubscriptionID(token);

    if (isSubscribed) {
      const { error } = await DELETE(apiRoutes.tokenSubscriptions, {
        params: {
          query: { id: subscriptionID } as unknown as DeleteUserTokenSubParams,
        },
      });
      if (error) {
        toast.error('Не получилось отписаться от токена. Попробуйте позже');
        return;
      }
      unsubscribe(token);
    } else {
      setIsSubscribeDialogOpen(true);
    }
  };

  return (
    <>
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

            {!isQuery(query) && (
              <Button
                variant="default"
                size="icon-sm"
                onClick={() => handleTokenSubscribe(query)}
                className="bg-transparent text-foreground hover:bg-muted hover:text-foreground ml-2"
              >
                {isTokenSubscribed(query) ? (
                  <BellRing className="h-6 w-6" />
                ) : (
                  <Bell className="h-6 w-6" />
                )}
              </Button>
            )}
          </div>

          <SearchTokenQuery />

          {isLoading ? (
            <ResultSkeletons />
          ) : (
            <>
              <div className="flex justify-end mb-2">
                <IntervalSelect />
              </div>
              <TokenInterestChart
                data={interestData}
                title="Уровень интереса"
                lines={{
                  value: {
                    label: 'Уровень интереса',
                    color: 'var(--chart-1)',
                  },
                }}
                timeRange={interval}
                className="h-[250px] w-full"
              />
              <SentimentChart
                data={sentimentData}
                title="Настроение аудитории"
                timeRange={interval}
                className="h-[250px] w-full"
              />
            </>
          )}
        </div>
      </div>
      <TokenSubscribeDialog
        token={tokenInfo.token}
        category={tokenInfo.category}
        open={isSubscribeDialogOpen}
        onOpenChange={setIsSubscribeDialogOpen}
      />
    </>
  );
};
