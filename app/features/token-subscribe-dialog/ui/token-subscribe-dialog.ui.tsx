'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { mapCategoryToLabel } from '@app/entities/category';
import { methodOptions } from '@app/entities/method';
import { useTokenSubscriptionsStore } from '@app/entities/token-subscription';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/shared/ui/select';
import {
  apiRoutes,
  POST,
  type SubscribeUserToTokenRequest,
  type UserTokenSub,
} from '@shared/api';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shared/ui/dialog';
import { Input } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { Spinner } from '@shared/ui/spinner';

interface TokenSubscribeDialogProps {
  token: string;
  category?: string | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TokenSubscribeDialog = ({
  token,
  category,
  open,
  onOpenChange,
}: TokenSubscribeDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [threshold, setThreshold] = useState<number>(1.2);
  const [method, setMethod] = useState<string>();

  const { subscribe } = useTokenSubscriptionsStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const { data, error, response } = await POST(
        apiRoutes.tokenSubscriptions,
        {
          body: {
            token: token,
            category: category,
            threshold: threshold,
            method: method,
          } as SubscribeUserToTokenRequest,
        },
      );
      if (response.status === 400) {
        toast.warning(
          'Вы ввели некорретные данные. Исправьте и попробуйте снова',
        );
        return;
      } else if (response.status === 404) {
        toast.warning(
          'Токен не существует, поэтому подписаться на него нельзя',
        );
        return;
      }
      if (error !== undefined) {
        toast.error(
          'Не получилось подписаться на токен. Попробуйте позже или сообщите нам',
        );
        return;
      }

      const subscription = data as unknown as UserTokenSub;
      subscribe(
        subscription.id,
        subscription.token,
        subscription.category,
        subscription.method,
        subscription.current_interest,
        subscription.previous_interest,
        subscription.last_scan,
      );

      toast.success('Вы успешно подписались на токен');
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Подписаться на токен</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-6 mt-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="token">Токен</Label>
              <Input
                id="token"
                required
                disabled
                value={token}
                className="w-full"
              />
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                required
                disabled
                value={mapCategoryToLabel(category)}
                className="w-full"
              />
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="threshold">Порог</Label>
              <Input
                id="threshold"
                type="number"
                step="0.1"
                min="0.0"
                max="10.0"
                required
                value={threshold}
                className="w-full"
                onChange={(e) => setThreshold(Number(e.target.value))}
              />
            </div>

            <div className="grid w-full items-center gap-2">
              <Select
                value={method}
                onValueChange={(value: string) => setMethod(value)}
              >
                <SelectTrigger className="w-full text-xs text-muted-foreground">
                  <SelectValue placeholder="Метод нормирования" />
                </SelectTrigger>

                <SelectContent>
                  {methodOptions.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="text-xs text-muted-foreground"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2"
            >
              {isLoading ? <Spinner className="w-4 h-4" /> : 'Подписаться'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
