const API_URL = import.meta.env.VXR_API_BASE_URL || '';

export async function request<B, T>(
  url: string,
  method = 'get',
  body: B | undefined = undefined,
  headers = {},
): Promise<T | { error: string }> {
  const controller = new AbortController();
  try {
    const res = await fetch(`${API_URL}${url}`, {
      method: method.toUpperCase(),
      signal: controller.signal,
      body: typeof body === 'object' ? JSON.stringify(body) : undefined,
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
        ...headers,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return { error: error.code };
    }
    return await res.json();
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  } finally {
    controller.abort();
  }
}

export async function withDefault<T>(
  promise: Promise<T | { error: unknown }>,
  defaultValue: T,
  options?: { log?: boolean },
): Promise<T> {
  try {
    const result = await promise;

    if (typeof result === 'object' && result !== null && 'error' in result) {
      if (options?.log) {
        console.error('api error:', result.error);
      }
      return defaultValue;
    }

    return result as T;
  } catch (err) {
    if (options?.log) {
      console.error('unexpected error:', err);
    }
    return defaultValue;
  }
}
