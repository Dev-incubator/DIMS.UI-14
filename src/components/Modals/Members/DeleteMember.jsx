import PropType from 'prop-types';
import classes from './DeleteMember.module.css';
import Button from '../../Button/Button';

export default function DeleteMember({ usersList, dispatch, modalSettings }) {
  const { selectedID } = modalSettings;
  const selectedUser = usersList.find((item) => item.id === selectedID);
  return (
    <div className={classes.modal}>
      <h3>Delete Member</h3>
      <div className={classes.text}>
        Are you really want to delete <br /> <span>{selectedUser.fullname}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={dispatch} modalSettings={modalSettings} roletag='delete'>
          Delete
        </Button>
        <Button onClick={dispatch} modalSettings={modalSettings}>
          Close
        </Button>
      </div>
    </div>
  );
}

DeleteMember.propTypes = {
  dispatch: PropType.func.isRequired,
  modalSettings: PropType.instanceOf(Object).isRequired,
  usersList: PropType.instanceOf(Array).isRequired,
};
