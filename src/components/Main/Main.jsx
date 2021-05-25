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

export default class Main extends React.Component {
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
              {(userContext) => <Route path='/main/users' render={() => <Users {...userContext} />} />}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {(userContext) => <Route exact path='/main/tasks' render={() => <Tasks {...userContext} />} />}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {(userContext) => (
                <Route exact path='/main/users/:userId/tasks' render={() => <UsersTasks {...userContext} />} />
              )}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {(userContext) => (
                <Route
                  exact
                  path='/main/users/:userId/tasks/:taskId/track'
                  render={() => <UsersTracks {...userContext} />}
                />
              )}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {(userContext) => (
                <Route exact path='/main/users/:userId/progress' render={() => <UsersProgress {...userContext} />} />
              )}
            </UserContext.Consumer>
          </div>
        </main>
      </div>
    );
  }
}
