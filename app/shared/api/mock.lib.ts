export function mockRequest<T>(
  mockData: T,
  force?: boolean,
  options?: { delay?: number },
): Promise<T> | undefined {
  const mockEnabled = import.meta.env.VXR_API_MOCK === 'true';

  const useMock = force ?? mockEnabled;

  if (!useMock) return undefined;

  const delay = options?.delay ?? 300;
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(mockData), delay);
  });
}
