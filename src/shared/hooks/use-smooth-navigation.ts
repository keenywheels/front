import React from 'react';
import { useNavigate } from 'react-router-dom';

export const useSmoothNavigation = () => {
  const navigate = useNavigate();

  return (e: React.MouseEvent, href: string, callback?: () => void) => {
    e.preventDefault();

    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (callback) callback();
      return;
    }

    navigate(href);
    if (callback) callback();
  };
};
