import type { AuthCallbackRequest, AuthCallbackResponse } from '@entities/auth';
import { mockRequest, request, withDefault } from '@shared/api';
import { apiRoutes } from '@shared/config/routes';

import { authCallbackResponseMock } from './auth.mock';

export async function authCallback({
  code,
  state,
  code_verifier,
  device_id,
  redirect_uri,
}: AuthCallbackRequest) {
  const mock = await mockRequest<AuthCallbackResponse>(
    authCallbackResponseMock,
  );
  if (mock) {
    return mock;
  }

  return withDefault(
    request<AuthCallbackRequest, AuthCallbackResponse>(
      apiRoutes.authCallback,
      'post',
      { code, state, code_verifier, device_id, redirect_uri },
    ),
    {
      user_exists: false,
      username: '',
      email: '',
    },
  );
}
