import { type AuthCallbackResponse } from '@entities/auth';

export const authCallbackResponseMock: AuthCallbackResponse = {
  userExists: true,
  username: 'test',
  email: 'test@mail.ru',
};
