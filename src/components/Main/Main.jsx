import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import classes from './Main.module.css';
import Header from './Header/Header';
import Loader from '../Loader/Loader';
import Aside from '../Aside/Aside';
import fetchUsers from '../../store/actionCreators/fetchUsers';
import fetchTasks from '../../store/actionCreators/fetchTasks';

export default function Main({ routes }) {
  const { loading } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.wrapper}>
      <Aside />
      <main className={classes.main}>
        <Header />
        <div className={classes.screen}>{routes}</div>
      </main>
    </div>
  );
}

Main.propTypes = {
  routes: PropTypes.instanceOf(Object),
};

Main.defaultProps = {
  routes: {},
};
