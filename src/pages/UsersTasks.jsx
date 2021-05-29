import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import classes from './UsersTasks.module.css';
import UserTask from '../components/Task/UserTask';
import { USERS, getElementDataFromCollection, updateStatus, getTasks } from '../utilities/fb-helpers';
import { reducerFunc, TASKS_STATUS_UPDATE, TASKS_SET_DATA } from './usersTasks-helpers';

export default class UsersTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userFullName: '',
      tasksList: [],
      tasksWithStatus: [],
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.updateData = this.updateData.bind(this);
    this.selectActFunc = this.selectActFunc.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { userId },
      },
    } = this.props;

    const userData = await getElementDataFromCollection(USERS, userId);
    const userFullName = `${userData.username} ${userData.surname}`;
    const tasksWithStatus = userData.tasks;
    const tasksList = await getTasks(tasksWithStatus);

    this.setState((prevState) =>
      reducerFunc(prevState, { type: TASKS_SET_DATA, userFullName, tasksWithStatus, tasksList, userId }),
    );
  }

  changeStatus(taskId, newStatus) {
    const { userId } = this.state;
    updateStatus(userId, taskId, newStatus, this.updateData);
  }

  async updateData() {
    const { userId } = this.state;
    const userData = await getElementDataFromCollection(USERS, userId);
    const tasksWithStatus = await userData.tasks;
    this.setState((prevState) => reducerFunc(prevState, { type: TASKS_STATUS_UPDATE, list: tasksWithStatus }));
  }

  selectActFunc(id, status) {
    const {
      loggedUser: { role },
    } = this.props;
    const isUser = role === 'User';
    if (!isUser) {
      this.changeStatus(id, status);
    }
  }

  render() {
    const { userFullName, tasksWithStatus, tasksList, userId } = this.state;
    const {
      loggedUser: { role },
    } = this.props;
    const isUser = role === 'User';

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
              <Button onClick={noop}>Back</Button>
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

UsersTasks.propTypes = {
  match: PropType.instanceOf(Object).isRequired,
  loggedUser: PropType.instanceOf(Object).isRequired,
};
