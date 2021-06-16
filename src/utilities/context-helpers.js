import { getFromLocalStorage, setToLocalStorage } from './localStorage-helpers';
import { THEMES } from './enums';

export const USERCONTEXT = 'userContext';
export const THEMECONTEXT = 'themeContext';

export const applyGlobalTheme = (theme) => {
  document.body.dataset.theme = theme;
};

export const getGlobalTheme = () => {
  return getFromLocalStorage(THEMES.THEME) || THEMES.DARK;
};

export const setGlobalTheme = (theme) => {
  setToLocalStorage(THEMES.THEME, theme);
};

export const getUserContext = () => {
  return getFromLocalStorage(USERCONTEXT) || {};
};

export const setUserContext = (user) => {
  setToLocalStorage(USERCONTEXT, user);
};
