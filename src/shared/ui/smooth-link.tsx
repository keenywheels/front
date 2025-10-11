'use client';

import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';

import { useSmoothNavigation } from '@shared/hooks/use-smooth-navigation';

interface SmoothLinkProps extends LinkProps {
  onNavigateEnd?: () => void;
}

export const SmoothLink: React.FC<SmoothLinkProps> = ({
  to,
  onNavigateEnd,
  onClick,
  ...props
}) => {
  const handleNavigation = useSmoothNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const href =
      typeof to === 'string'
        ? to
        : ((to as { pathname?: string }).pathname ?? '');

    handleNavigation(e, href, onNavigateEnd);
  };

  return <Link to={to} onClick={handleClick} {...props} />;
};
