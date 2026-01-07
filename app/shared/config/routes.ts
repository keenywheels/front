export const routes = {
  landing: '/',
  searchToken: '/home/search',
  searchResult: '/home/search/result',
  savedQueries: '/home/saved',
};

export const BASE_URL = import.meta.env.VXR_BASE_URL;
export const API_URL = import.meta.env.VXR_API_BASE_URL;

export const apiRoutes = {
  searchToken: '/api/v1/token/search',
  logoutUser: '/api/v1/auth/logout',
  getMe: '/api/v1/auth/me',
};
