import PropTypes from 'prop-types';
import classes from './EditTrack.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';
import { useAllSelectedFormsValidityChecker, useInput, useValidator } from '../modals-helpers';

export default function EditTrack({ track: { id, date, note, title, name, startDate }, closeFunc, liftUpEditTrack }) {
  const { state, onChange } = useInput(() => ({
    id,
    date,
    note,
    name,
  }));
  const { errors, validator } = useValidator(
    () => ({
      name: true,
      date: true,
    }),
    { ...state, startDate },
    { name: state.name, date: state.date },
  );

  const isValid = useAllSelectedFormsValidityChecker(validator, state);

  const editTrack = () => {
    liftUpEditTrack(state);
    closeFunc();
  };

  const closeModal = () => closeFunc();

  return (
    <div className={classes.modal}>
      <h3 className={classes.title}>Edit Track</h3>
      <form>
        <div className={classes.wrapper}>
          <CraftInput title='Task Name' readOnly value={title} />
          <CraftInput
            title='Track Name'
            isRequired
            id='name'
            value={state.name}
            onChange={onChange}
            error={errors.nameError}
          />
          <CraftInput
            title='Date'
            isRequired
            id='date'
            type='date'
            value={state.date}
            error={errors.dateError}
            onChange={onChange}
          />
          <CraftInput title='Note' id='note' type='textarea' value={state.note} onChange={onChange} />
        </div>
        <div className={classes.requiredWarning}>* - these fields are required.</div>
        <div className={classes.buttons}>
          <Button onClick={editTrack} roleClass='edit' disabled={!isValid}>
            Edit
          </Button>
          <Button onClick={closeModal}>Close</Button>
        </div>
      </form>
    </div>
  );
}

EditTrack.propTypes = {
  track: PropTypes.instanceOf(Object).isRequired,
  closeFunc: PropTypes.func.isRequired,
  liftUpEditTrack: PropTypes.func.isRequired,
};
