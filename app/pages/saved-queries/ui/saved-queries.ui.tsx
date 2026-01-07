import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';

import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { isQuery } from '@app/entities/token';
import { routes } from '@app/shared/config/routes';
import { Pagination } from '@app/widgets/pagination';
import { useSavedQueriesStore } from '@entities/auth/store/query.store';
import {
  apiRoutes,
  DELETE,
  type DeleteUserQueryParams,
  type UserQuery,
} from '@shared/api';
import { Button } from '@shared/ui/button';
import { Label } from '@shared/ui/label';

import type { Route } from './+types/saved-queries';

export const SavedQueriesPage = () => {
  const data = useLoaderData<Route.ClientLoaderData>();
  const { queries, setQueries, removeQuery } = useSavedQueriesStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!('error' in data)) {
      setQueries(data.queries);
    } else {
      toast.error(
        'Не получилось загрузить сохраненные запросы. Попробуйте позже',
      );
    }
  }, [data, setQueries]);

  const handleDeleteQuery = async (queryID: string, queryText: string) => {
    const { error } = await DELETE(apiRoutes.savedQueries, {
      params: { query: { id: queryID } as DeleteUserQueryParams },
    });

    if (error) {
      toast.error(
        'Не получилось удалить запрос из сохраненных. Попробуйте позже',
      );
      return;
    }

    removeQuery(queryText);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const page = data.pagination?.page ?? 1;

  return (
    <div className="@container/main flex flex-1 flex-col px-4 md:px-6">
      <div className="w-full mx-auto space-y-6">
        <Label className="text-2xl font-bold">Сохраненные запросы</Label>

        {queries.length === 0 ? (
          <div className="text-center text-base py-8 text-muted-foreground">
            Здесь будут появляться сохраненные запросы
          </div>
        ) : (
          <div className="space-y-3">
            {queries.map((query: UserQuery) => (
              <div
                key={query.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p
                    className="font-medium cursor-pointer text-blue-600 hover:underline"
                    onClick={() => {
                      const formattedQuery = isQuery(query.query)
                        ? query.query
                        : `token('${query.query.trim()}')`;

                      const params = new URLSearchParams();
                      params.set('query', formattedQuery);

                      navigate({
                        pathname: routes.searchResult,
                        search: params.toString(),
                      });
                    }}
                  >
                    {query.query}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(query.searchDate)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteQuery(query.id, query.query)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {queries.length > 0 && <Pagination page={page} />}
      </div>
    </div>
  );
};
