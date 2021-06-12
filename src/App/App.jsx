import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import classes from './App.module.css';
import Main from '../components/Main/Main';
import { UserContext } from './userContext';
import { getRoleDependedRoutes } from '../components/Routes';
import { getFromLocalStorage, setToLocalStorage } from '../utilities/localStorage-helpers';
import PageNotFound from '../pages/PageNotFound';

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
    const routes = isLogged ? getRoleDependedRoutes(loggedUser) : null;
    const isLoggedRedirector = isLogged ? null : <Redirect to='/' />;

    return (
      <>
        <BrowserRouter>
          <UserContext.Provider value={contextState}>
            <div className={classes.app}>
              <Switch>
                <Route exact path='/' render={(props) => <Login {...props} {...contextState} />} />
                <Route path='/main' render={(props) => <Main {...props} routes={routes} />} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </UserContext.Provider>
          {isLoggedRedirector}
        </BrowserRouter>
      </>
    );
  }
}
