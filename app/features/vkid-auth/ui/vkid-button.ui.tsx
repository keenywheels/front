'use client';

import { useEffect, useRef } from 'react';

import * as VKID from '@vkid/sdk';

import { authCallback, type AuthCallbackResponse } from '@entities/auth';
import { useUserStore } from '@entities/auth';
import { BASE_URL } from '@shared/config/routes';
import { initVKID } from '@shared/config/vkid';
import { genCodeVerifier } from '@shared/lib/utils/pkce/pkce';

interface Props {
  containerID: string;
  active?: boolean;
}

export const VKIDButton = ({ containerID, active = true }: Props) => {
  const initialized = useRef(false);
  const { setUser, setPendingAuth } = useUserStore();

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

        const response: AuthCallbackResponse = await authCallback({
          code,
          state: payloadState,
          device_id,
          code_verifier: codeVerifier,
          redirect_uri: BASE_URL,
        });

        if (response?.vkid) {
          if (response.user_exists) {
            setUser({
              vkid: response.vkid,
              username: response.username || '',
              email: response.email || '',
            });
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
      });

    initialized.current = true;
  }, [containerID, active, setUser, setPendingAuth]);

  return <div id={containerID}></div>;
};
