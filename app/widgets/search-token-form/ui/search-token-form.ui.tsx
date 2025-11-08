import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { routes } from '@shared/config/routes';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';

export const SearchTokenForm = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token.trim()) {
      return;
    }
    navigate(`${routes.searchResult}?token=${encodeURIComponent(token)}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
      <Input
        type="search"
        placeholder="Ключевое слово"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        required
      />
      <Button type="submit">Поиск</Button>
    </form>
  );
};
