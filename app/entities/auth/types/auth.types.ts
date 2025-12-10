export type AuthCallbackRequest = {
  code: string;
  state: string;
  code_verifier: string;
  device_id: string;
  redirect_uri: string;
};

export type AuthCallbackResponse = {
  user_exists: boolean;
  username: string;
  email: string;
  vkid: number;
};

export type RegisterUserRequest = {
  username: string;
  email: string;
  vkid: number;
};

export type RegisterUserResponse = object;

export type LogoutUserRequest = object;

export type LogoutUserResponse = object;
