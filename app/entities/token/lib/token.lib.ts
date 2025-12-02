export const isQuery = (query: string): boolean => {
  return /token\(|[+*/-]/.test(query);
};
