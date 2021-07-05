import PropTypes from 'prop-types';
import { useEffect, useReducer, useRef } from 'react';
import classes from './CreateTask.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';
import { TASKS, createElemRefOnDB } from '../../../utilities/fb-helpers';
import {
  stateReducer,
  TASK_ONCHANGE,
  TASK_VALIDATE,
  useAllSelectedFormsValidityChecker,
  validatorReducer,
} from '../modals-helpers';

export default function CreateTask({ closeFunc, usersList, liftUpCreateTask }) {
  const newTaskRef = useRef(createElemRefOnDB(TASKS));
  const onChangeSnapshotRef = useRef({});

  const [state, dispatchState] = useReducer(stateReducer, newTaskRef.current.id, (newTaskId) => ({
    title: '',
    description: '',
    startDate: '',
    deadLine: '',
    selectedUsers: [],
    id: newTaskId,
  }));

  const [validator, dispatchValidator] = useReducer(validatorReducer, undefined, () => ({
    validator: {
      title: false,
      startDate: false,
      deadLine: false,
      selectedUsers: false,
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

  const isValid = useAllSelectedFormsValidityChecker(validator.validator, state);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    onChangeSnapshotRef.current = { name, value, type };
    dispatchState({ type: TASK_ONCHANGE, payload: { name, value, type } });
  };

  const createTask = () => {
    liftUpCreateTask(newTaskRef.current, state);
    closeFunc();
  };

  const closeModal = () => closeFunc();

  return (
    <div className={classes.modal}>
      <h3 className={classes.title}>Create Task</h3>
      <form>
        <div className={classes.wrapper}>
          <CraftInput
            title='Title'
            isRequired
            id='title'
            value={state.title}
            onChange={handleChange}
            error={validator.errors.titleError}
          />
          <CraftInput title='Description' id='description' value={state.description} onChange={handleChange} />
          <CraftInput
            title='Start Date'
            id='startDate'
            isRequired
            type='date'
            value={state.startDate}
            onChange={handleChange}
            error={validator.errors.startDateError}
          />
          <CraftInput
            title='DeadLine'
            isRequired
            id='deadLine'
            type='date'
            value={state.deadLine}
            onChange={handleChange}
            error={validator.errors.deadLineError}
          />
          <CraftInput
            title='Users'
            isRequired
            id='selectedUsers'
            type='checkbox'
            value={state.selectedUsers}
            options={usersList}
            onChange={handleChange}
            error={validator.errors.selectedUsersError}
          />
        </div>
        <div className={classes.requiredwarning}>* - these fields are required.</div>
        <div className={classes.buttons}>
          <Button onClick={createTask} roleClass='create' disabled={!isValid}>
            Create
          </Button>
          <Button onClick={closeModal}>Close</Button>
        </div>
      </form>
    </div>
  );
}

CreateTask.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  usersList: PropTypes.instanceOf(Array).isRequired,
  liftUpCreateTask: PropTypes.func.isRequired,
};
