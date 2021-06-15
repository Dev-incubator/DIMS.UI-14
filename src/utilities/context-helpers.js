import { getFromLocalStorage, setToLocalStorage } from './localStorage-helpers';

export const THEME = 'theme';
export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

export const applyGlobalTheme = (theme) => {
  document.body.dataset.theme = theme;
};

export const getGlobalTheme = () => {
  return getFromLocalStorage(THEME) || THEME_DARK;
};

export const setGlobalTheme = (theme) => {
  setToLocalStorage(THEME, theme);
};

export const USERCONTEXT = 'userContext';

export const getUserContext = () => {
  return getFromLocalStorage(USERCONTEXT) || {};
};

export const setUserContext = (user) => {
  setToLocalStorage(USERCONTEXT, user);
};
