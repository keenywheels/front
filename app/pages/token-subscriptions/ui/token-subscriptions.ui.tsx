import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';

import { Info, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { mapCategoryToLabel } from '@app/entities/category';
import { mapMethodToLabel } from '@app/entities/method';
import { useTokenSubscriptionsStore } from '@app/entities/token-subscription';
import type {
  DeleteUserTokenSubParams,
  UserTokenSub,
} from '@app/shared/api/models';
import { routes } from '@app/shared/config/routes';
import { Badge } from '@app/shared/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@app/shared/ui/tooltip';
import { Pagination } from '@app/widgets/pagination';
import { apiRoutes, DELETE } from '@shared/api';
import { Button } from '@shared/ui/button';
import { Label } from '@shared/ui/label';

import type { Route } from './+types/token-subscriptions';

export const TokenSubscriptionsPage = () => {
  const data = useLoaderData<Route.ClientLoaderData>();
  const { subscriptions, setSubscriptions, unsubscribe } =
    useTokenSubscriptionsStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!('error' in data)) {
      setSubscriptions(data.subscriptions);
    } else {
      toast.error('Не получилось загрузить подписки. Попробуйте позже');
    }
  }, [data, setSubscriptions]);

  const handleUnsubscribeToken = async (
    tokenSubscriptionID: string,
    token: string,
  ) => {
    const { error } = await DELETE(apiRoutes.tokenSubscriptions, {
      params: {
        query: { id: tokenSubscriptionID } as DeleteUserTokenSubParams,
      },
    });

    if (error) {
      toast.error('Не получилось отписаться от токена. Попробуйте позже');
      return;
    }

    unsubscribe(token);
  };

  const page = data.pagination?.page ?? 1;

  return (
    <div className="@container/main flex flex-1 flex-col px-4 md:px-6">
      <div className="w-full mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <Label className="text-2xl font-bold">Подписки на токены</Label>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[250px]">
                  Подписывайтесь на токены при поиске аналитики, чтобы получать
                  алерты на электронную почту при изменении интереса к токену
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {subscriptions.length === 0 ? (
          <div className="text-center text-base py-8 text-muted-foreground">
            Здесь будут появляться токены, на которые вы подписаны
          </div>
        ) : (
          <div className="space-y-3">
            {subscriptions.map((subscription: UserTokenSub) => (
              <div
                key={subscription.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="space-y-1">
                  <p
                    className="font-medium cursor-pointer text-blue-600 hover:underline"
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.set('query', subscription.token);

                      navigate({
                        pathname: routes.searchResult,
                        search: params.toString(),
                      });
                    }}
                  >
                    {subscription.token}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {mapCategoryToLabel(subscription.category)}
                    </Badge>

                    <Badge variant="outline">
                      {mapMethodToLabel[subscription.method]}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleUnsubscribeToken(subscription.id, subscription.token)
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {subscriptions.length > 0 && <Pagination page={page} />}
      </div>
    </div>
  );
};
