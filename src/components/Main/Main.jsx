import PropTypes from 'prop-types';
import classes from './Main.module.css';
import Header from './Header/Header';
import Aside from '../Aside/Aside';

const Main = ({ routes }) => {
  return (
    <div className={classes.wrapper}>
      <Aside />
      <main className={classes.main}>
        <Header />
        <div className={classes.screen}>{routes}</div>
      </main>
    </div>
  );
};

export default Main;

Main.propTypes = {
  routes: PropTypes.instanceOf(Object),
};

Main.defaultProps = {
  routes: {},
};
