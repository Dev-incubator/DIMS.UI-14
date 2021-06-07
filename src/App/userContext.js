import React from 'react';
import noop from '../shared/noop';

export const UserContext = React.createContext({
  isLogged: false,
  user: {},
  setUserContext: noop,
});
UserContext.displayName = 'UserContext';
