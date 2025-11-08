import * as React from 'react';

import { ThemeContext } from '@shared/lib/providers/theme';

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
