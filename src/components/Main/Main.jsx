import PropType from 'prop-types';
import { Route } from 'react-router-dom';
import classes from './Main.module.css';
import Header from './Header/Header';
import Users from '../../pages/Users';
// import Tasks from '../../pages/Tasks';

export default function Main({ dispatch, settings: { menu, modal }, data: { usersList } }) {
  // tasksList
  return (
    <main className={classes.main}>
      <Header dispatch={dispatch} menu={menu} />
      <div className={classes.screen}>
        <Route path='/users' render={() => <Users usersList={usersList} modalSettings={modal} dispatch={dispatch} />} />
        {/* <Route path='/tasks' render={() => <Tasks tasksList={tasksList} />} /> */}
      </div>
    </main>
  );
}

Main.propTypes = {
  settings: PropType.instanceOf(Object).isRequired,
  data: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
};
