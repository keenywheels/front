import { useState } from 'react';
import { useUnmount } from 'react-use';

import type { UseModalResult } from './modal.types';

export const useModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  useUnmount(close);

  return { isOpen, open, close };
};
