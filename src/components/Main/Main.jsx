import PropType from 'prop-types';
import { Route } from 'react-router-dom';
import classes from './Main.module.css';
import Header from './Header/Header';
import Users from '../../pages/Users';
import Tasks from '../../pages/Tasks';
import UsersTasks from '../../pages/UsersTasks';
import UsersTracks from '../../pages/UsersTracks';

export default function Main({ toggleMenu, isOpen }) {
  return (
    <main className={classes.main}>
      <Header toggleMenu={toggleMenu} isOpen={isOpen} />
      <div className={classes.screen}>
        <Route exact path='/users' component={Users} />
        <Route exact path='/tasks' component={Tasks} />
        <Route exact path='/users/:userID/tasks' component={UsersTasks} />
        <Route exact path='/users/:userID/tasks/:taskID/track' component={UsersTracks} />
      </div>
    </main>
  );
}

Main.propTypes = {
  isOpen: PropType.bool.isRequired,
  toggleMenu: PropType.func.isRequired,
};
