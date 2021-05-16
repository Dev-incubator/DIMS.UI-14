import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import classes from './UsersTasks.module.css';
import UserTask from '../components/Task/UserTask';
import { USERS, TASKS, getElementFromCollection, updateStatus } from '../utilities/fb-helpers';
import { reducerFunc, STATUS_UPDATE, SET_DATA } from './Users-tasks-helpers';

export default class UsersTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: '',
      tasksList: [],
      tasksWithStatus: [],
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { userId },
      },
    } = this.props;

    const user = await getElementFromCollection(USERS, userId);
    const userName = `${user.data().username} ${user.data().surname}`;
    const { role } = user.data();
    const tasksWithStatus = user.data().tasks;
    async function getTasksList(array) {
      const tasks = [];
      await Promise.all(
        array.map(async (item) => {
          const task = await getElementFromCollection(TASKS, item.id);
          tasks.push(task.data());
        }),
      );

      return tasks;
    }
    const tasksList = await getTasksList(tasksWithStatus);
    this.setState((prevState) =>
      reducerFunc(prevState, { type: SET_DATA, userName, tasksWithStatus, tasksList, userId, role }),
    );
  }

  changeStatus(taskId, newStatus) {
    const { userId } = this.state;
    updateStatus(userId, taskId, newStatus, this.updateData);
  }

  async updateData() {
    const { userId } = this.state;
    const user = await getElementFromCollection(USERS, userId);
    const tasksWithStatus = await user.data().tasks;
    this.setState((prevState) => reducerFunc(prevState, { type: STATUS_UPDATE, list: tasksWithStatus }));
  }

  render() {
    const { userName, tasksWithStatus, tasksList, isUser, userId } = this.state;

    const selectActFunc = () => {
      if (isUser) {
        return () => noop;
      }

      return (id, status) => this.changeStatus(id, status);
    };

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
          actFunc={selectActFunc()}
        />
      );
    });

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            {`${userName}'s Tasks `}
            <span>({`${tasks.length}`})</span>
          </h2>
          {isUser ? null : (
            <NavLink className={classes.navLink} to='/users'>
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
};
