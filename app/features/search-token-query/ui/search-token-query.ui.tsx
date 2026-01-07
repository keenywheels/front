import React, { useEffect, useState } from 'react';
import { useNavigate, useNavigation, useSearchParams } from 'react-router';

import { InputWithTooltip } from '@app/shared/ui/input-with-tooltip';
import { isQuery } from '@entities/token';
import { routes } from '@shared/config/routes';
import { Button } from '@shared/ui/button';
import { Spinner } from '@shared/ui/spinner';

import { FilterCategory } from './filter-category.ui';
import { SearchFilters } from './filters.ui';

export const SearchTokenQuery = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    const urlQuery = searchParams.get('query');
    setQuery(urlQuery ?? query);
  }, [searchParams.get('query')]);

  const formatQuery = (input: string): string => {
    const trimmed = input.trim();

    if (isQuery(trimmed)) {
      return trimmed;
    } else {
      return `token('${trimmed}')`;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }

    const formattedQuery = formatQuery(query);
    const params = new URLSearchParams(searchParams);
    params.set('query', formattedQuery);

    navigate({
      pathname: routes.searchResult,
      search: params.toString(),
    });
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-center gap-2">
        <InputWithTooltip
          type="search"
          placeholder="Токен или формула"
          tooltip="Можно вводить токены (например, vk) или формулы вида token('vk') / token('vixar') * 100 с операторами +, -, *, /"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading} className="w-[100px]">
          {isLoading ? <Spinner /> : 'Поиск'}
        </Button>
      </div>

      <SearchFilters>
        <FilterCategory />
      </SearchFilters>
    </form>
  );
};
