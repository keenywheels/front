'use client';

import { useEffect, useState } from 'react';

import { registerUser, useUserStore } from '@entities/auth';
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

  const [isDialogVisible, setIsDialogVisible] = useState(!!pendingAuth);

  useEffect(() => {
    if (pendingAuth) {
      setIsDialogVisible(true);
    }
  }, [pendingAuth]);

  const handleSave = async () => {
    if (!pendingAuth) return;
    setIsLoading(true);

    try {
      await registerUser({
        vkid: pendingAuth.vkid,
        username: pendingAuth.username,
        email: pendingAuth.email,
      });

      setUser({
        vkid: pendingAuth.vkid,
        username: pendingAuth.username,
        email: pendingAuth.email,
      });

      setPendingAuth(undefined);
      setIsDialogVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isDialogVisible}
      onOpenChange={(open) => setIsDialogVisible(open)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Завершите регистрацию</DialogTitle>
          <DialogDescription>
            Заполните данные профиля, чтобы получить полный доступ ко всем
            функциям сервиса
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <div className="grid w-full max-w-sm items-center gap-1 mt-3">
            <Label htmlFor="username">Имя пользователя</Label>
            <Input
              id="username"
              required
              value={pendingAuth?.username}
              onChange={(e) =>
                setPendingAuth({ ...pendingAuth, username: e.target.value })
              }
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1 mt-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              required
              type="email"
              value={pendingAuth?.email}
              onChange={(e) =>
                setPendingAuth({ ...pendingAuth, email: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2"
          >
            {isLoading ? <Spinner className="w-4 h-4" /> : 'Продолжить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
