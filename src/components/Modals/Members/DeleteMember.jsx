import PropType from 'prop-types';
import classes from './DeleteMember.module.css';
import Button from '../../Button/Button';

export default function DeleteMember({ dispatch, toggler, type }) {
  return (
    <div className={classes.modal}>
      <h3>Delete Member</h3>
      <div className={classes.text}>Are you really want to delete the current member?</div>
      <div className={classes.buttons}>
        <Button roletag='delete'>Delete</Button>
        <Button onClick={dispatch} toggler={toggler} type={type}>
          Close
        </Button>
      </div>
    </div>
  );
}

DeleteMember.propTypes = {
  toggler: PropType.string.isRequired,
  dispatch: PropType.func.isRequired,
  type: PropType.instanceOf(Object).isRequired,
};
