export const extractTokens = (query: string): string[] => {
  const tokenRegex = /token\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  const matches = query.matchAll(tokenRegex);
  const tokens = new Set<string>();
  for (const match of matches) {
    tokens.add(match[1]);
  }
  return Array.from(tokens);
};

export const createQueryEval = (
  query: string,
): ((data: Record<string, number>) => number) => {
  const transformedQuery = query.replace(
    /token\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    (_, tokenName: string) => {
      if (!/^[a-zA-Z0-9\s-]+$/.test(tokenName)) {
        throw new Error(`invalid token name: ${tokenName}`);
      }
      return `data['${tokenName}']`;
    },
  );

  try {
    return new Function('data', `return ${transformedQuery}`) as (
      data: Record<string, number>,
    ) => number;
  } catch (error) {
    console.error('error creating query evaluator:', error);
    return () => 0;
  }
};
