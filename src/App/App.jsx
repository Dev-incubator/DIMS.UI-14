import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import classes from './App.module.css';
import Main from '../components/Main/Main';
import { UserContext } from './userContext';
import { getRoleDependedRoutes } from '../components/Routes';
import {
  applyGlobalTheme,
  getGlobalTheme,
  setGlobalTheme,
  getUserContext,
  setUserContext,
} from '../utilities/context-helpers';
import { ThemeContext } from './themeContext';
import { THEMES } from '../utilities/enums';
import PageNotFound from '../pages/PageNotFound';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userContext: {
        ...getUserContext(),
        setUserContext: this.setUserContext,
      },

      themeContext: {
        theme: getGlobalTheme(),
        setThemeContext: this.setThemeContext,
      },
    };
  }

  setUserContext = (loggedUser) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        userContext: {
          ...prevState.userContext,
          loggedUser,
          isLogged: !prevState.userContext.isLogged,
        },
      }),
      this.updateUserContext,
    );
  };

  updateUserContext = () => {
    const { userContext } = this.state;
    setUserContext(userContext);
  };

  setThemeContext = (themeName) => {
    const {
      themeContext: { theme },
    } = this.state;
    if (theme === themeName) return;
    const nextTheme = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    this.setState(
      (prevState) => ({
        ...prevState,
        themeContext: {
          ...prevState.themeContext,
          theme: nextTheme,
        },
      }),
      this.updateThemeContext,
    );
  };

  updateThemeContext = () => {
    const {
      themeContext: { theme },
    } = this.state;
    setGlobalTheme(theme);
  };

  render() {
    const {
      themeContext,
      themeContext: { theme },
      userContext,
      userContext: { isLogged, loggedUser },
    } = this.state;
    applyGlobalTheme(theme);
    const routes = isLogged ? getRoleDependedRoutes(loggedUser) : null;
    const isLoggedRedirector = isLogged ? null : <Redirect to='/' />;

    return (
      <>
        <BrowserRouter>
          <ThemeContext.Provider value={themeContext}>
            <UserContext.Provider value={userContext}>
              <div className={classes.app}>
                <Switch>
                  <Route exact path='/' render={(props) => <Login {...props} {...userContext} />} />
                  <Route path='/main' render={(props) => <Main {...props} routes={routes} />} />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            </UserContext.Provider>
          </ThemeContext.Provider>
          {isLoggedRedirector}
        </BrowserRouter>
      </>
    );
  }
}
