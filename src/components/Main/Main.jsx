import React from 'react';
import { Route } from 'react-router-dom';
import classes from './Main.module.css';
import Header from './Header/Header';
import Users from '../../pages/Users';
import Tasks from '../../pages/Tasks';
import UsersTasks from '../../pages/UsersTasks';
import UsersTracks from '../../pages/UsersTracks';
import UsersProgress from '../../pages/UsersProgress';
import Aside from '../Aside/Aside';
import { reducerFunc, TOGGLE_MENU } from './main-helpers';
import { UserContext } from '../../App/userContext';

export default class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState((prevState) => reducerFunc(prevState, { type: TOGGLE_MENU }));
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div className={classes.wrapper}>
        <Aside isOpen={isOpen} />
        <main className={classes.main}>
          <Header toggleMenu={this.toggleMenu} isOpen={isOpen} />
          <div className={classes.screen}>
            <UserContext.Consumer>
              {(userContext) => (
                <Route exact path='/main/users' render={(props) => <Users {...props} {...userContext} />} />
              )}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {(userContext) => (
                <Route exact path='/main/tasks' render={(props) => <Tasks {...props} {...userContext} />} />
              )}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {(userContext) => (
                <Route
                  exact
                  path='/main/users/:userId/tasks'
                  render={(props) => <UsersTasks {...props} {...userContext} />}
                />
              )}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {(userContext) => (
                <Route
                  exact
                  path='/main/users/:userId/tasks/:taskId/track'
                  render={(props) => <UsersTracks {...props} {...userContext} />}
                />
              )}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {(userContext) => (
                <Route
                  {...userContext}
                  exact
                  path='/main/users/:userId/progress'
                  render={(props) => <UsersProgress {...props} {...userContext} />}
                />
              )}
            </UserContext.Consumer>
          </div>
        </main>
      </div>
    );
  }
}
