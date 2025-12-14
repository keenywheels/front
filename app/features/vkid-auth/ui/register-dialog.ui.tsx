'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { toast } from 'sonner';

import { useUserStore } from '@entities/auth';
import { apiRoutes, POST, type VKAuthRegisterRequest } from '@shared/api';
import { routes } from '@shared/config/routes';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shared/ui/dialog';
import { Input } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { Spinner } from '@shared/ui/spinner';

export const RegisterDialog = () => {
  const { pendingAuth, setPendingAuth, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isDialogVisible, setIsDialogVisible] = useState(!!pendingAuth);

  useEffect(() => {
    if (pendingAuth) {
      setIsDialogVisible(true);
    }
  }, [pendingAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pendingAuth) return;

    try {
      setIsLoading(true);

      const { error, response } = await POST(apiRoutes.registerUser, {
        body: {
          vkid: pendingAuth.vkid,
          username: pendingAuth.username,
          email: pendingAuth.email,
        } as VKAuthRegisterRequest,
      });
      if (response.status === 400) {
        toast.warning(
          'Вы ввели некорретные данные. Исправьте и попробуйте снова',
        );
        return;
      }
      if (error !== undefined) {
        toast.error(
          'Не получилось авторизоваться через VK ID. Попробуйте позже или сообщите нам',
        );
        return;
      }
    } finally {
      setIsLoading(false);
    }

    setUser({
      vkid: pendingAuth.vkid,
      username: pendingAuth.username,
      email: pendingAuth.email,
    });

    navigate(routes.searchToken);

    setPendingAuth(undefined);
    setIsDialogVisible(false);
  };

  return (
    <Dialog open={isDialogVisible} onOpenChange={setIsDialogVisible}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Завершите регистрацию</DialogTitle>
            <DialogDescription>
              Заполните данные профиля, чтобы получить полный доступ ко всем
              функциям сервиса
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 mt-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                required
                value={pendingAuth?.username || ''}
                onChange={(e) =>
                  setPendingAuth({ ...pendingAuth, username: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                type="email"
                value={pendingAuth?.email || ''}
                onChange={(e) =>
                  setPendingAuth({ ...pendingAuth, email: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2"
            >
              {isLoading ? <Spinner className="w-4 h-4" /> : 'Продолжить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
