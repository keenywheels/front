import { useState } from 'react';

import { Button } from '@shared/ui/button.tsx';
import { Input } from '@shared/ui/input.tsx';

export const SearchTokenForm = () => {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('search token form submitted:', token);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center gap-2"
    >
      <Input
        type="search"
        placeholder="Токен"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        required
      />
      <Button type="submit">Искать</Button>
    </form>
  );
};
