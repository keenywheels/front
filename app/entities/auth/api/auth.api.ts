import type { AuthCallbackRequest, AuthCallbackResponse } from '@entities/auth';
import type {
  RegisterUserRequest,
  RegisterUserResponse,
} from '@entities/auth/types/auth.types';
import { mockRequest, request, withDefault } from '@shared/api';
import { apiRoutes } from '@shared/config/routes';

import {
  authCallbackResponseMock,
  registerUserResponseMock,
} from './auth.mock';

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
      vkid: 0,
    },
  );
}

export async function registerUser({
  username,
  email,
  vkid,
}: RegisterUserRequest) {
  const mock = await mockRequest<RegisterUserResponse>(
    registerUserResponseMock,
  );
  if (mock) {
    return mock;
  }

  return withDefault(
    request<RegisterUserRequest, RegisterUserResponse>(
      apiRoutes.registerUser,
      'post',
      { username, email, vkid },
    ),
    {},
  );
}
