import PropType from 'prop-types';
import { Route } from 'react-router-dom';
import classes from './Main.module.css';
import Header from './Header/Header';
import Users from '../../pages/Users';
import Tasks from '../../pages/Tasks';

export default function Main({ dispatch, menu }) {
  return (
    <main className={classes.main}>
      <Header dispatch={dispatch} menu={menu} />
      <div className={classes.screen}>
        <Route path='/users' render={() => <Users />} />
        <Route path='/tasks' render={() => <Tasks />} />
      </div>
    </main>
  );
}

Main.propTypes = {
  menu: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
};
