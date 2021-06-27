import PropTypes from 'prop-types';
import classes from './CreateTrack.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';

import { TRACKS, createElemRefOnDB } from '../../../utilities/fb-helpers';
import { useInput, useValidator } from '../modals-helpers';

export default function CreateTrack({ task: { title, startDate }, closeFunc, liftUpCreateTrack }) {
  const { state, onChange } = useInput({
    id: createElemRefOnDB(TRACKS).id,
    name: '',
    date: '',
    note: '',
  });

  const { errors, isValid } = useValidator(
    {
      name: false,
      date: false,
    },
    undefined,
    startDate,
    ['name', state.name],
    ['date', state.date],
  );

  const createTrack = () => {
    liftUpCreateTrack(state);
    closeFunc();
  };

  return (
    <div className={classes.modal}>
      <h3 className={classes.title}>Create New Track</h3>
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
            title='Track Date'
            isRequired
            id='date'
            type='date'
            value={state.date}
            error={errors.dateError}
            onChange={onChange}
          />
          <CraftInput title='Track Note' id='note' type='textarea' value={state.note} onChange={onChange} />
        </div>
        <div className={classes.requiredwarning}>* - these fields are required.</div>
        <div className={classes.buttons}>
          <Button onClick={createTrack} roleClass='create' disabled={!isValid}>
            Create
          </Button>
          <Button onClick={() => closeFunc()}>Close</Button>
        </div>
      </form>
    </div>
  );
}

CreateTrack.propTypes = {
  task: PropTypes.shape({
    startDate: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  closeFunc: PropTypes.func.isRequired,
  liftUpCreateTrack: PropTypes.func.isRequired,
};
