import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import classes from './App.module.css';
import Main from '../components/Main/Main';
import { UserContext } from './userContext';
import { getRoleDependedRoutes } from '../components/Routes';
import { getFromLocalStorage, setToLocalStorage } from '../utilities/localStorage-helpers';
import rolesPack from '../utilities/rolesPack';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...(getFromLocalStorage('userContext') || {}),
      setUserContext: this.setUserContext,
    };
  }

  setUserContext = (loggedUser) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        loggedUser,
        isLogged: !prevState.isLogged,
      }),
      () => setToLocalStorage('userContext', this.state),
    );
  };

  render() {
    const { loggedUser, isLogged } = this.state;
    const contextState = this.state;
    const isLoggedRedirector = isLogged ? <Redirect to={getRedirectPath(loggedUser)} /> : <Redirect to='/' />;
    const routes = isLogged ? getRoleDependedRoutes(loggedUser) : null;

    return (
      <>
        <BrowserRouter>
          <UserContext.Provider value={contextState}>
            <div className={classes.app}>
              <UserContext.Consumer>
                {(userContext) => <Route exact path='/' render={(props) => <Login {...props} {...userContext} />} />}
              </UserContext.Consumer>
              <Route path='/main' render={(props) => <Main {...props} routes={routes} />} />
              {isLoggedRedirector}
            </div>
          </UserContext.Provider>
        </BrowserRouter>
      </>
    );
  }
}

const getRedirectPath = (loggedUser) => {
  switch (loggedUser.role) {
    case rolesPack.admin:
      return '/main/users';
    case rolesPack.mentor:
      return '/main/tasks';
    case rolesPack.user:
      return `/main/users/${loggedUser.id}/tasks`;
    default:
      return '/'; // to 404
  }
};
