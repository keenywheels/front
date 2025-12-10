import { type AuthCallbackResponse } from '@entities/auth';
import type {
  LogoutUserResponse,
  RegisterUserResponse,
} from '@entities/auth/types/auth.types';

export const authCallbackResponseMock: AuthCallbackResponse = {
  user_exists: false,
  username: 'test',
  email: 'test@mail.ru',
  vkid: 123,
};

export const registerUserResponseMock: RegisterUserResponse = {};

export const logoutUserResponseMock: LogoutUserResponse = {};
