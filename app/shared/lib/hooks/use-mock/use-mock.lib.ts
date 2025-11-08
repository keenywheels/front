import { useMemo } from 'react';

export function useMock<T>(
  mockData: T,
  force?: boolean,
  options?: { delay?: number },
): Promise<T> | undefined {
  const mockEnabled =
    import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.DEV;

  const useMock = force ?? mockEnabled;

  return useMemo(() => {
    if (!useMock) return undefined;

    const delay = options?.delay ?? 300;
    return new Promise<T>((resolve) => {
      setTimeout(() => resolve(mockData), delay);
    });
  }, [useMock, mockData, options]);
}
