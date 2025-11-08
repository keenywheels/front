import { LocalStorage } from '../local-storage.lib';

/**
 * Determines whether an error is a QuotaExceededError.
 *
 * Browsers love throwing slightly different variations of QuotaExceededError
 * (this is especially true for old browsers/versions), so we need to check
 * different fields and values to ensure we cover every edge-case.
 *
 * @param err - The error to check
 * @return Is the error a QuotaExceededError?
 *
 * @source https://mmazzarolo.com/blog/2022-06-25-local-storage-status/
 */
const isQuotaExceededError = (err: unknown): boolean =>
  err instanceof DOMException &&
  // everything except Firefox
  (err.name === 'QuotaExceededError' ||
    // Firefox
    err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    // legacy
    err.name === 'QUOTA_EXCEEDED_ERR');

export const checkQuota = <V>(value: V): boolean => {
  const storage = new LocalStorage<V>('__check_quota__', {
    error: { catcher: false },
  });

  try {
    storage.set(value);
    return true;
  } catch (err) {
    if (isQuotaExceededError(err)) {
      return false;
    }
    throw err;
  } finally {
    storage.clear();
  }
};
