import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './UsersProgress.module.css';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import { USERS, TASKS, getElementFromCollection } from '../utilities/fb-helpers';
import SimpleTrack from '../components/Track/SimpleTrack';

export default class UsersProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      allTracks: [],
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { userID },
      },
    } = this.props;
    const user = await getElementFromCollection(USERS, userID);
    const { tasks } = user.data();
    const userName = `${user.data().username} ${user.data().surname}`;
    const allTracks = await tasks.reduce(async (tempArr, task) => {
      const taskData = await getElementFromCollection(TASKS, task.id);
      const { title } = taskData.data();
      const extendedTracks = await Promise.all(
        task.tracks.map(async (track) => {
          return { ...track, title };
        }),
      );
      return (await tempArr).concat(extendedTracks);
    }, []);
    this.setState((prevState) => ({
      ...prevState,
      allTracks,
      userName,
    }));
  }

  render() {
    const { allTracks, userName } = this.state;
    const trackItems = allTracks.map((track, index) => {
      return <SimpleTrack tableIndex={index + 1} note={track.note} title={track.title} date={track.date} />;
    });

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            {`${userName}'s Progress `}
            <span>({`${allTracks.length}`})</span>
          </h2>
          <NavLink className={classes.navLink} to='/users'>
            <Button onClick={noop}>Back</Button>
          </NavLink>
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Task Name</div>
            <div>Task Note</div>
            <div>Date</div>
          </div>
          {trackItems}
        </div>
      </div>
    );
  }
}

UsersProgress.propTypes = {
  match: PropType.instanceOf(Object).isRequired,
};
