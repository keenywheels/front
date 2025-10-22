export const routes = {
  landing: '/',
  searchToken: '/home/search',
  searchResult: '/home/search/result',
};

const API_URL = import.meta.env.VXR_API_BASE_URL;

export const apiRoutes = {
  interestAll: `${API_URL}/api/v1/interest/all`,
};
