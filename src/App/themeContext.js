import React from 'react';
import noop from '../shared/noop';

export const ThemeContext = React.createContext({
  isLightTheme: true,
  setThemeContext: noop,
});
ThemeContext.displayName = 'ThemeContext';
