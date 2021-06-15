import React from 'react';
import noop from '../shared/noop';
import { USERCONTEXT } from '../utilities/context-helpers';

export const UserContext = React.createContext({
  isLogged: false,
  user: {},
  setUserContext: noop,
});
UserContext.displayName = USERCONTEXT;
