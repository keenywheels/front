import { useSearchParams } from 'react-router';

export const useQueryParam = (key: string, defaultValue?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(key) ?? defaultValue;

  const setValue = (nextValue: string) => {
    const next = new URLSearchParams(searchParams);

    if (nextValue === '' || nextValue === defaultValue) {
      next.delete(key);
    } else {
      next.set(key, nextValue);
    }

    setSearchParams(next, { replace: true });
  };

  return [value, setValue] as const;
};
