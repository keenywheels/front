'use client';

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import * as VKID from '@vkid/sdk';
import { toast } from 'sonner';

import { useUserStore } from '@entities/auth';
import type {
  VKAuthCallbackRequest,
  VKAuthCallbackResponse,
} from '@shared/api';
import { apiRoutes, POST } from '@shared/api';
import { BASE_URL, routes } from '@shared/config/routes';
import { initVKID } from '@shared/config/vkid';
import { genCodeVerifier } from '@shared/lib/utils/pkce/pkce';

interface Props {
  containerID: string;
  active?: boolean;
}

export const VKIDButton = ({ containerID, active = true }: Props) => {
  const initialized = useRef(false);
  const { setUser, setPendingAuth } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!active || initialized.current) return;

    const container = document.getElementById(containerID);
    if (!container) return;

    const codeVerifier = genCodeVerifier();
    const state = crypto.randomUUID();

    initVKID({ state, codeVerifier });

    const oneTap = new VKID.OneTap();

    oneTap
      .render({ container, fastAuthEnabled: false, showAlternativeLogin: true })
      .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, async (payload: never) => {
        const { code, state: payloadState, device_id } = payload;

        const { data, error } = await POST(apiRoutes.authCallback, {
          body: {
            code: code,
            state: payloadState,
            device_id: device_id,
            code_verifier: codeVerifier,
            redirect_uri: BASE_URL,
          } as VKAuthCallbackRequest,
        });
        if (error !== undefined) {
          toast.error(
            'Не получилось авторизоваться через VK ID. Попробуйте позже или сообщите нам',
          );
          return;
        }
        const response = data as unknown as VKAuthCallbackResponse;

        if (response.vkid) {
          if (response.user_exists) {
            setUser({
              vkid: response.vkid,
              username: response.username || '',
              email: response.email || '',
            });
            navigate(routes.searchToken);
          } else {
            setPendingAuth({
              vkid: response.vkid,
              code: code,
              state: payloadState,
              deviceID: device_id,
              codeVerifier: codeVerifier,
              username: response.username ?? '',
              email: response.email ?? '',
            });
          }
        }
      })
      .on(VKID.OneTapInternalEvents.NOT_AUTHORIZED, async (_: never) => {
        toast.error(
          'Не получилось авторизоваться через VK ID. Попробуйте позже или сообщите нам',
        );
      });

    initialized.current = true;
  }, [containerID, active, setUser, setPendingAuth, navigate]);

  return <div id={containerID}></div>;
};
