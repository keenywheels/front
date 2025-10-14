import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@shared/ui/button.tsx';
import { Input } from '@shared/ui/input.tsx';

export const SearchTokenForm = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token.trim()) return;
    navigate(`/search/result/?q=${encodeURIComponent(token)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
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
