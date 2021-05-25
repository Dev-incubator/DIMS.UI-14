import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import classes from './App.module.css';
import Main from '../components/Main/Main';
import { UserContext } from './userContext';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLogged: false,
      setUserContext: this.setUserContext,
    };
  }

  setUserContext = (user) => {
    this.setState((prevState) => ({
      ...prevState,
      user,
      isLogged: !prevState.isLogged,
    }));
  };

  render() {
    const { user, isLogged } = this.state;
    const contextState = this.state;
    const isLoggedRedirector = isLogged ? <Redirect exact from='/' to={getRedirectPath(user)} /> : null;

    return (
      <>
        <BrowserRouter>
          <UserContext.Provider value={contextState}>
            <div className={classes.app}>
              <Switch>
                <UserContext.Consumer>
                  {(userContext) => <Route path='/' render={() => <Login userContext={userContext} />} />}
                </UserContext.Consumer>
                <Route path='/main' component={Main} />
                {isLoggedRedirector}
              </Switch>
            </div>
          </UserContext.Provider>
        </BrowserRouter>
      </>
    );
  }
}

export const getRedirectPath = (loggedUser) => {
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
