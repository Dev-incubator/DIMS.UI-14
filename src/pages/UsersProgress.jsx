import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './UsersProgress.module.css';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import { USERS, getElementFromCollection, getAllTracksFromAllTasks } from '../utilities/fb-helpers';
import SimpleTrack from '../components/Track/SimpleTrack';

export default class UsersProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFullName: '',
      allTracks: [],
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { userId },
      },
    } = this.props;
    const user = await getElementFromCollection(USERS, userId);
    const userData = user.data();
    const { tasks, username, surname } = userData;
    const userFullName = `${username} ${surname}`;
    const allTracks = await getAllTracksFromAllTasks(tasks);
    this.setState({ allTracks, userFullName });
  }

  render() {
    const { allTracks, userFullName } = this.state;
    const trackItems = allTracks.map((track, index) => {
      return (
        <SimpleTrack tableIndex={index + 1} key={track.id} note={track.note} title={track.title} date={track.date} />
      );
    });

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            {`${userFullName}'s Progress `}
            <span>({`${allTracks.length}`})</span>
          </h2>
          <NavLink className={classes.navLink} to='/main/users'>
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
