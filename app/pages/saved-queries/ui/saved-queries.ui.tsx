import { useLoaderData } from 'react-router';

import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
import { Pagination } from './pagination.ui';

export const SavedQueriesPage = () => {
  const { removeQuery } = useSavedQueriesStore();

  const data = useLoaderData<Route.ClientLoaderData>();
  if ('error' in data) {
    toast.error(
      'Не получилось загрузить сохраненные запросы. Попробуйте позже',
    );
    return null;
  }

  const handleDeleteQuery = async (queryID: string, query: string) => {
    const { error } = await DELETE(apiRoutes.savedQueries, {
      params: {
        query: {
          id: queryID,
        } as DeleteUserQueryParams,
      },
    });
    if (error) {
      toast.error(
        'Не получилось удалить запрос из сохраненных. Попробуйте позже',
      );
      return;
    }

    removeQuery(query);
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

  const { queries, pagination } = data;
  const page = pagination?.page ?? 1;

  return (
    <div className="@container/main flex flex-1 flex-col px-4 md:px-6">
      <div className="w-full mx-auto space-y-6">
        <Label className="text-2xl font-bold">Сохраненные запросы</Label>

        {queries.length === 0 ? (
          <div className="text-center text-xl py-8 text-muted-foreground">
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
                  <p className="font-medium">{query.query}</p>
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
