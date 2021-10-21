import PropTypes from 'prop-types';
import { useEffect, useReducer, useRef } from 'react';
import classes from './EditTask.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';
import {
  stateReducer,
  TASK_ONCHANGE,
  TASK_VALIDATE,
  useAllSelectedFormsValidityChecker,
  validatorReducer,
} from '../modals-helpers';

export default function EditTask({ closeFunc, task, liftUpEditTask, usersList }) {
  const onChangeSnapshotRef = useRef({});

  const [state, dispatchState] = useReducer(stateReducer, undefined, () => ({
    ...task,
  }));

  const [{ validator, errors }, dispatchValidator] = useReducer(validatorReducer, undefined, () => ({
    validator: {
      title: true,
      startDate: true,
      deadLine: true,
      selectedUsers: true,
    },
    errors: {
      titleError: '',
      startDateError: '',
      deadLineError: '',
      selectedUsersError: '',
    },
  }));

  useEffect(() => {
    dispatchValidator({ type: TASK_VALIDATE, payload: { state, event: onChangeSnapshotRef.current } });
    /*
     I don't need other dependencies here, coz validator's reducer has a checker, which verifies,
      event-changed field inside or outside validator and returns prevState.
    */
  }, [state]);

  const isValid = useAllSelectedFormsValidityChecker(validator, state);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    onChangeSnapshotRef.current = { name, value, type };
    dispatchState({ type: TASK_ONCHANGE, payload: { name, value, type } });
  };

  const editTask = () => {
    const editedTask = { ...state };
    liftUpEditTask(editedTask);
    closeFunc();
  };

  const closeModal = () => closeFunc();

  return (
    <div className={classes.modal}>
      <h3 className={classes.title}>Edit Task</h3>
      <form>
        <div className={classes.wrapper}>
          <CraftInput
            title='Title'
            isRequired
            id='title'
            value={state.title}
            onChange={handleChange}
            error={errors.titleError}
          />
          <CraftInput title='Description' id='description' value={state.description} onChange={handleChange} />
          <CraftInput
            title='Start Date'
            id='startDate'
            isRequired
            type='date'
            value={state.startDate}
            onChange={handleChange}
            error={errors.startDateError}
          />
          <CraftInput
            title='DeadLine'
            isRequired
            id='deadLine'
            type='date'
            value={state.deadLine}
            onChange={handleChange}
            error={errors.deadLineError}
          />
          <CraftInput
            title='Users'
            isRequired
            id='selectedUsers'
            type='checkbox'
            value={state.selectedUsers}
            options={usersList}
            onChange={handleChange}
            error={errors.selectedUsersError}
          />
        </div>
        <div className={classes.requiredWarning}>* - these fields are required.</div>
        <div className={classes.buttons}>
          <Button onClick={editTask} roleClass='edit' disabled={!isValid}>
            Edit
          </Button>
          <Button onClick={closeModal}>Close</Button>
        </div>
      </form>
    </div>
  );
}

EditTask.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  liftUpEditTask: PropTypes.func.isRequired,
  task: PropTypes.instanceOf(Object).isRequired,
  usersList: PropTypes.instanceOf(Array).isRequired,
};
