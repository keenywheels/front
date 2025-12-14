import type { components, operations } from './gen/v1';

export type ErrorResponse = components['schemas']['Error'];

export type VKAuthCallbackRequest =
  components['schemas']['VkAuthCallbackRequest'];
export type VKAuthCallbackResponse =
  components['schemas']['VkAuthCallbackResponse'];
export type VKAuthRegisterRequest =
  components['schemas']['VkAuthRegisterRequest'];

export type SearchTokenInfoRequest =
  components['schemas']['SearchTokenInfoRequest'];
export type TokenInfo = components['schemas']['TokenInfo'];
export type TokenRecord = components['schemas']['TokenRecord'];
export type SearchTokenInfoResponse = TokenInfo[];

export type UserQuery = components['schemas']['UserSearchQuery'];

export type GetUserQueriesParams =
  operations['getUserSearchQueries']['parameters']['query'];
export type GetUserQueriesResponse = UserQuery[];

export type SaveUserQueryRequest =
  components['schemas']['SaveUserQueryRequest'];
export type SaveUserQueryResponse =
  components['schemas']['SaveUserQueryResponse'];

export type DeleteUserQueryParams =
  operations['deleteUserSearchQuery']['parameters']['query'];
