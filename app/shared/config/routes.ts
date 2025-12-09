export const routes = {
  landing: '/',
  searchToken: '/home/search',
  searchResult: '/home/search/result',
};

export const BASE_URL = import.meta.env.VXR_BASE_URL;
export const API_URL = import.meta.env.VXR_API_BASE_URL;

export const apiRoutes = {
  searchToken: `${API_URL}/api/v1/token/search`,
  authCallback: `${API_URL}/api/v1/auth/vk/callback`,
  registerUser: `${API_URL}/api/v1/auth/vk/register`,
};
