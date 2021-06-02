import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import classes from './App.module.css';
import Main from '../components/Main/Main';
import { UserContext } from './userContext';
import { getRoleDependedRoutes } from '../components/Routes';
import { getFromLocalStorage, setToLocalStorage } from '../utilities/localStorage-helpers';
import { applyGlobalTheme, getGlobalTheme } from '../utilities/theme-helpers';
import { ThemeContext } from './themeContext';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userContext: {
        ...(getFromLocalStorage('userContext') || {}),
        setUserContext: this.setUserContext,
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
    setToLocalStorage('userContext', userContext);
  };

  render() {
    const {
      userContext,
      userContext: { isLogged, loggedUser },
    } = this.state;
    const themeContext = getGlobalTheme();
    applyGlobalTheme(themeContext);
    const isLoggedRedirector = isLogged ? <Redirect to={getRedirectPath(loggedUser)} /> : <Redirect to='/' />;
    const routes = isLogged ? getRoleDependedRoutes(loggedUser) : null;

    return (
      <>
        <BrowserRouter>
          <ThemeContext.Provider value={themeContext}>
            <UserContext.Provider value={userContext}>
              <div className={classes.app}>
                <Route exact path='/' render={(props) => <Login {...props} {...userContext} />} />
                <Route path='/main' render={(props) => <Main {...props} routes={routes} />} />
                {isLoggedRedirector}
              </div>
            </UserContext.Provider>
          </ThemeContext.Provider>
        </BrowserRouter>
      </>
    );
  }
}

const getRedirectPath = (loggedUser) => {
  switch (loggedUser.role) {
    case 'Admin':
      return '/main/users';
    case 'Mentor':
      return '/main/tasks';
    case 'User':
      return `/main/users/${loggedUser.id}/tasks`;
    default:
      return '/'; // to 404
  }
};
