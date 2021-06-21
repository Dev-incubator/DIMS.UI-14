import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import classes from './UsersTasks.module.css';
import UserTask from '../components/Task/UserTask';
import { updateStatus } from '../utilities/fb-helpers';
import { ROLES } from '../utilities/enums';
import fetchUsers from '../store/actionCreators/fetchUsers';
import fetchTasks from '../store/actionCreators/fetchTasks';
import Loader from '../components/Loader/Loader';

class UsersTasks extends React.PureComponent {
  componentDidMount() {
    const { fetchUsers, usersList, tasksList, fetchTasks } = this.props;
    if (!usersList.length) fetchUsers();
    if (!tasksList.length) fetchTasks();
  }

  changeStatus = (taskId, newStatus) => {
    const { userId, fetchUsers } = this.props;
    updateStatus(userId, taskId, newStatus, fetchUsers);
  };

  selectActFunc = (id, status) => {
    const {
      loggedUser: { role },
    } = this.props;
    const isUser = role === ROLES.USER;
    if (!isUser) {
      this.changeStatus(id, status);
    }
  };

  render() {
    const {
      loading,
      userFullName,
      tasksWithStatus,
      tasksList,
      userId,
      loggedUser: { role },
    } = this.props;
    const isUser = role === ROLES.USER;

    if (loading) return <Loader />;

    const tasks = tasksWithStatus.map((task, index) => {
      const taskObj = tasksList.find((item) => item.id === task.id);

      return (
        <UserTask
          userId={userId}
          taskId={task.id}
          tableIndex={index + 1}
          key={task.id}
          status={task.status}
          isUser={isUser}
          startDate={taskObj.startDate}
          deadLine={taskObj.deadLine}
          title={taskObj.title}
          actFunc={this.selectActFunc}
        />
      );
    });

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            {`${userFullName}'s Tasks `}
            <span>({`${tasks.length}`})</span>
          </h2>
          {isUser ? null : (
            <NavLink className={classes.navLink} to='/main/users'>
              <Button onClick={noop} onScreen>
                Back
              </Button>
            </NavLink>
          )}
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Task Name</div>
            <div>Start Date</div>
            <div>Deadline</div>
            <div>Status</div>
            <div>{isUser ? 'View Tracks' : 'Update Status'}</div>
          </div>
          {tasks}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { userId },
    },
  } = ownProps;
  if (!state.users.usersList.length || !state.tasks.tasksList.length) {
    return {
      loading: state.app.loading,
      userId,
      userFullName: '',
      tasksWithStatus: [],
      tasksList: [],
      usersList: state.users.usersList,
    };
  }
  const userData = state.users.usersList.find((user) => user.id === userId);
  const userFullName = `${userData.username} ${userData.surname}`;
  const tasksWithStatus = userData.tasks;
  // It's not similar tasksList as in another pages (it's mapped tasksList).
  const tasksList = tasksWithStatus.map((taskWithStatus) =>
    state.tasks.tasksList.find((task) => task.id === taskWithStatus.id),
  );

  return {
    loading: state.app.loading,
    userId,
    userFullName,
    tasksWithStatus,
    tasksList,
    usersList: state.users.usersList,
  };
};

export default connect(mapStateToProps, { fetchUsers, fetchTasks })(UsersTasks);

UsersTasks.propTypes = {
  loading: PropType.bool.isRequired,
  userId: PropType.string.isRequired,
  userFullName: PropType.string.isRequired,
  tasksWithStatus: PropType.instanceOf(Array).isRequired,
  usersList: PropType.instanceOf(Array).isRequired,
  tasksList: PropType.instanceOf(Array).isRequired,
  loggedUser: PropType.instanceOf(Object).isRequired,
  fetchUsers: PropType.func.isRequired,
  fetchTasks: PropType.func.isRequired,
};
