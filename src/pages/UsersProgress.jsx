import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './UsersProgress.module.css';
import Button from '../components/Button/Button';
import noop from '../shared/noop';

export default function UsersProgress({
  match: {
    params: { userID },
  },
}) {
  return (
    <div>
      <div className={classes.header}>
        <h2 className={classes.title}>
          {/* {`${userName}'s Progress `} */}
          {/* <span>({`${tasks.length}`})</span> */}
          {userID}
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
        {/* {tasks} */}
      </div>
    </div>
  );
}

UsersProgress.propTypes = {
  match: PropType.instanceOf(Object).isRequired,
};
