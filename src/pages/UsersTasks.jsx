import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import classes from './UsersTasks.module.css';
import UserTask from '../components/Task/UserTask';
import { USERS, TASKS, getElementFromCollection } from '../utilities/fb-helpers';

export default class UsersTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      userName: '',
      tasksList: [],
      tasksWithStatus: [],
    };
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
      role,
      userName,
      tasksWithStatus,
      tasksList,
    }));
  }

  render() {
    const { userName, tasksWithStatus, tasksList } = this.state;

    const tasks = tasksWithStatus.map((task, index) => {
      const taskObj = tasksList.find((item) => item.id === task.id);

      return (
        <UserTask
          tableIndex={index + 1}
          key={task.id}
          status={task.status}
          title={taskObj.title}
          startDate={taskObj.startDate}
          deadLine={taskObj.deadLine}
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
