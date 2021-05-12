import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import classes from './UsersTasks.module.css';
import UserTask from '../components/Task/UserTask';
import { USERS, TASKS, getElementFromCollection, updateStatus } from '../utilities/fb-helpers';

export default class UsersTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      isUser: false,
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
        params: { userID },
      },
    } = this.props;

    const user = await getElementFromCollection(USERS, userID);
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
    this.setState((prevState) => ({
      ...prevState,
      role: role === 'User',
      userName,
      tasksWithStatus,
      tasksList,
      userID,
    }));
  }

  changeStatus(taskID, newStatus) {
    const { userID } = this.state;
    updateStatus(userID, taskID, newStatus, this.updateData);
  }

  async updateData() {
    const { userID } = this.state;
    const user = await getElementFromCollection(USERS, userID);
    const tasksWithStatus = await user.data().tasks;
    this.setState((prevState) => ({
      ...prevState,
      tasksWithStatus,
    }));
  }

  render() {
    const { userName, tasksWithStatus, tasksList, isUser } = this.state;

    const selectActFunc = () => {
      switch (isUser) {
        case true:
          return () => noop;
        case false:
          return (id, status) => this.changeStatus(id, status);
        default:
          return () => noop;
      }
    };

    const tasks = tasksWithStatus.map((task, index) => {
      const taskObj = tasksList.find((item) => item.id === task.id);

      return (
        <UserTask
          id={task.id}
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
          <h2 className={classes.title}>{`${userName}'s current tasks`}</h2>
          <NavLink className={classes.navLink} to='/users'>
            <Button onClick={noop}>Back</Button>
          </NavLink>
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Task Name</div>
            <div>Start Date</div>
            <div>Deadline</div>
            <div>Status</div>
            <div>Update Status</div>
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
