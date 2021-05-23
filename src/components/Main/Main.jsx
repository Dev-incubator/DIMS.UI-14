import React from 'react';
import PropType from 'prop-types';
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

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      loggedUserEmail: '',
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    const {
      location: {
        state: { loggedUserEmail },
      },
    } = this.props;
    this.setState({ loggedUserEmail });
  }

  toggleMenu() {
    this.setState((prevState) => reducerFunc(prevState, { type: TOGGLE_MENU }));
  }

  render() {
    const { isOpen, loggedUserEmail } = this.state;

    return (
      <div className={classes.wrapper}>
        <Aside isOpen={isOpen} />
        <main className={classes.main}>
          <Header toggleMenu={this.toggleMenu} isOpen={isOpen} />
          <div className={classes.screen}>
            {loggedUserEmail}
            <Route exact path='/main/users' component={Users} />
            <Route path='/main/tasks' component={Tasks} />
            <Route exact path='/main/users/:userId/tasks' component={UsersTasks} />
            <Route exact path='/main/users/:userId/tasks/:taskId/track' component={UsersTracks} />
            <Route exact path='/main/users/:userId/progress' component={UsersProgress} />
          </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  location: PropType.shape({
    state: PropType.shape({
      loggedUserEmail: PropType.string.isRequired,
    }),
  }).isRequired,
};
