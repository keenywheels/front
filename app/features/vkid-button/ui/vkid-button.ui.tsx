import { useEffect, useState } from 'react';

import * as VKID from '@vkid/sdk';

import { authCallback } from '@entities/auth';
import { BASE_URL } from '@shared/config/routes';
import { initVKID } from '@shared/config/vkid';
import { genCodeVerifier } from '@shared/lib/utils/pkce/pkce';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shared/ui/dialog';
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';

export const VKIDButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [vkData, setVkData] = useState<{
    code: string;
    state: string;
    deviceID: string;
    codeVerifier: string;
  } | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const codeVerifier = genCodeVerifier();
    const state = crypto.randomUUID();

    initVKID({ state, codeVerifier });

    const oneTap = new VKID.OneTap();
    const container = document.getElementById('VkIdSdkOneTap');

    if (container) {
      oneTap
        .render({ container, showAlternativeLogin: true })
        .on(
          VKID.OneTapInternalEvents.LOGIN_SUCCESS,
          async (payload: { code: never; state: never; device_id: never }) => {
            const { code, state, device_id } = payload;

            const response = await authCallback({
              code,
              state,
              device_id,
              code_verifier: codeVerifier,
              redirect_uri: BASE_URL,
            });

            if (!response?.user_exists) {
              setVkData({ code, state, deviceID: device_id, codeVerifier });
              setIsDialogOpen(true);
            }
          },
        );
    }
  }, []);

  return (
    <>
      <div id="VkIdSdkOneTap"></div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete your profile</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
