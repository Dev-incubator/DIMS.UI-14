import PropType from 'prop-types';
import Button from '../components/Button/Button';
import classes from './Users.module.css';
import User from '../components/User/User';
import Modal from '../components/Modals/Modal';

export default function Users({ dispatch, usersList, modalSettings }) {
  const users = usersList.map((user) => {
    return <User dispatch={dispatch} modalSettings={modalSettings} key={user.id.toString()} userData={user} />;
  });

  return (
    <div>
      <div className={classes.header}>
        <h2 className={classes.title}>
          Users <span>({`${usersList.length}`})</span>
        </h2>
        <Button modalSettings={modalSettings} onClick={dispatch}>
          Create
        </Button>
      </div>
      <div className={classes.content}>
        <div className={classes.subheader}>
          <div>№</div>
          <div>Full Name</div>
          <div>Direction</div>
          <div>Education</div>
          <div>Start</div>
          <div>Age</div>
          <div>Controls</div>
        </div>
        {users}
      </div>
      <Modal usersList={usersList} dispatch={dispatch} modalSettings={modalSettings} />
    </div>
  );
}

Users.propTypes = {
  usersList: PropType.instanceOf(Array).isRequired,
  modalSettings: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
};
