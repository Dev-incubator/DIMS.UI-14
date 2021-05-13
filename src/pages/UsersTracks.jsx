import React from 'react';
import PropType from 'prop-types';
import noop from '../shared/noop';
import Button from '../components/Button/Button';
import classes from './UsersTracks.module.css';
import { USERS, TASKS, getElementFromCollection } from '../utilities/fb-helpers';
import Track from '../components/Track/Track';

export default class UsersTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      taskID: '',
      taskWithStatus: '',
      taskData: '',
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { userID, taskID },
      },
    } = this.props;

    const user = await getElementFromCollection(USERS, userID);
    const taskWithStatus = await user.data().tasks.find((item) => item.id === taskID);
    const task = await getElementFromCollection(TASKS, taskID);
    const taskData = task.data();

    this.setState((prevState) => ({
      ...prevState,
      userID,
      taskID,
      taskData,
      taskWithStatus,
    }));
  }

  render() {
    const { userID, taskID } = this.state;

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>Task tracks</h2>
          <Button onClick={noop} roleClass='create'>
            Create
          </Button>
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Task Name</div>
            <div>Task Note</div>
            <div>Date</div>
            <div>Controls</div>
          </div>
          {taskID},{userID}
          <Track />
        </div>
      </div>
    );
  }
}

UsersTracks.propTypes = {
  match: PropType.instanceOf(Object).isRequired,
};
