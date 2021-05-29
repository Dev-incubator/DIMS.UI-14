import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './UsersProgress.module.css';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import { USERS, getElementDataFromCollection, getAllTracksFromAllTasks } from '../utilities/fb-helpers';
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
    const userData = await getElementDataFromCollection(USERS, userId);
    const userFullName = `${userData.username} ${userData.surname}`;
    const allTracks = await getAllTracksFromAllTasks(userData.tasks);
    this.setState({ allTracks, userFullName });
  }

  render() {
    const { allTracks, userFullName } = this.state;
    const trackItems = allTracks.map((track, index) => {
      return (
        <SimpleTrack
          tableIndex={index + 1}
          key={track.id}
          note={track.note}
          title={track.title}
          date={track.date}
          name={track.name}
        />
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
            <div>Track Name</div>
            <div>Track Note</div>
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
