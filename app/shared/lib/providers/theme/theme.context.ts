import * as React from 'react';

type Theme = 'dark' | 'light' | 'system';

export type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeState = {
  theme: 'system',
  setTheme: () => null,
};

export const ThemeContext = React.createContext<ThemeState>(initialState);
