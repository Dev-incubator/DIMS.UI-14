import PropType from 'prop-types';
import { Route } from 'react-router-dom';
import classes from './Main.module.css';
import Header from './Header/Header';
import Users from '../../pages/Users';
import Tasks from '../../pages/Tasks';

export default function Main({ toggleMenu, isOpen }) {
  return (
    <main className={classes.main}>
      <Header toggleMenu={toggleMenu} isOpen={isOpen} />
      <div className={classes.screen}>
        <Route path='/users' component={Users} />
        <Route path='/tasks' component={Tasks} />
      </div>
    </main>
  );
}

Main.propTypes = {
  isOpen: PropType.bool.isRequired,
  toggleMenu: PropType.func.isRequired,
};
