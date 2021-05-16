import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import classes from './UsersTasks.module.css';
import { USERS, TASKS, getElementFromCollection } from '../utilities/fb-helpers';

export default class UsersTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      tasksList: [],
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { userID },
      },
    } = this.props;

    const tasksList = [];
    let userName = '';
    getElementFromCollection(USERS, userID)
      .then((user) => {
        userName = `${user.data().username} ${user.data().surname}`;
        const userTasks = user.data().tasks;

        return userTasks;
      })
      .then((userTasks) => {
        userTasks.forEach((taskID) => {
          getElementFromCollection(TASKS, taskID).then((task) => {
            tasksList.push(task.data());
          });
        });
      })
      .then(() => {
        this.setState((prevState) => ({
          ...prevState,
          tasksList,
          userName,
        }));
      });
  }

  render() {
    const { userName } = this.state;

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
          {/* tasks */}
        </div>
      </div>
    );
  }
}

UsersTasks.propTypes = {
  match: PropType.instanceOf(Object).isRequired,
};
