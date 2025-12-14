import * as VKID from '@vkid/sdk';

import { VKID_CLIENT_ID } from '@shared/config/consts';
import { BASE_URL } from '@shared/config/routes';

export interface VKIDInitOptions {
  state: string;
  codeVerifier: string;
  scope?: string;
}

export function initVKID({
  state,
  codeVerifier,
  scope = 'email',
}: VKIDInitOptions) {
  if (typeof window === 'undefined') return;

  const redirectUrl = new URL(BASE_URL);
  redirectUrl.port = '';

  VKID.Config.init({
    app: VKID_CLIENT_ID,
    state: state,
    scope: scope,
    codeVerifier: codeVerifier,
    redirectUrl: redirectUrl.toString().replace(/\/$/, ''),
    responseMode: VKID.ConfigResponseMode.Callback,
    source: VKID.ConfigSource.LOWCODE,
  });
}
