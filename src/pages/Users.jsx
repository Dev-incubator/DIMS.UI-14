import PropType from 'prop-types';
import Button from '../components/Button/Button';
import classes from './Users.module.css';
import User from '../components/User/User';
import Modal from '../components/Modals/Modal';

export default function Users({ dispatch, usersList, modal }) {
  const users = usersList.map((user) => {
    return (
      <User
        modal={modal}
        dispatch={dispatch}
        key={user.id.toString()}
        id={user.id}
        fullname={user.fullname}
        direction={user.direction}
        education={user.education}
        start={user.start}
        age={user.age}
      />
    );
  });

  return (
    <div>
      <div className={classes.header}>
        <h2 className={classes.title}>
          Users <span>({`${usersList.length}`})</span>
        </h2>
        <Button onClick={dispatch} toggler={modal.toggler} type={modal.types.memberCreate}>
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
      <Modal dispatch={dispatch} modal={modal} />
    </div>
  );
}

Users.propTypes = {
  usersList: PropType.instanceOf(Array).isRequired,
  modal: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
};
