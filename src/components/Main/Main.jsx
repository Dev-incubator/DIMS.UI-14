import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './Main.module.css';
import Header from './Header/Header';
import Loader from '../Loader/Loader';
import Aside from '../Aside/Aside';
import fetchUsers from '../../store/actionCreators/fetchUsers';
import fetchTasks from '../../store/actionCreators/fetchTasks';

class Main extends React.Component {
  componentDidMount() {
    const { usersList, tasksList, fetchUsers, fetchTasks } = this.props;
    if (!usersList.length) {
      fetchUsers();
    }
    if (!tasksList.length) {
      fetchTasks();
    }
  }

  shouldComponentUpdate() {
    const { usersList, tasksList } = this.props;

    return !(usersList.length && tasksList.length);
  }

  render() {
    const { routes, loading } = this.props;

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
}

const mapStateToProps = (state) => {
  return {
    usersList: state.users.usersList,
    tasksList: state.tasks.tasksList,
    loading: state.app.loading,
  };
};

export default connect(mapStateToProps, { fetchUsers, fetchTasks })(Main);

Main.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  usersList: PropTypes.instanceOf(Array).isRequired,
  tasksList: PropTypes.instanceOf(Array).isRequired,
  routes: PropTypes.instanceOf(Object),
};

Main.defaultProps = {
  routes: {},
};
