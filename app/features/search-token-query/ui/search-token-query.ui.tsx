import React, { useEffect, useState } from 'react';
import { useNavigate, useNavigation, useSearchParams } from 'react-router';

import { routes } from '@shared/config/routes';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Spinner } from '@shared/ui/spinner';

export const SearchTokenQuery = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }

    const params = new URLSearchParams();
    params.set('query', query);

    navigate({
      pathname: routes.searchResult,
      search: params.toString(),
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
      <Input
        type="search"
        placeholder="Токен или формула"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
        className="flex-1"
        aria-label="Поиск по токену или формуле"
      />
      <Button type="submit" disabled={isLoading} className="w-[100px]">
        {isLoading ? <Spinner /> : 'Поиск'}
      </Button>
    </form>
  );
};
