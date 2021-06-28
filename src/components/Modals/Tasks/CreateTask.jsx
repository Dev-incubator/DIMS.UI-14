import PropTypes from 'prop-types';
import { useEffect, useReducer, useRef, useState } from 'react';
import classes from './CreateTask.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';
import { TASKS, createElemRefOnDB } from '../../../utilities/fb-helpers';
import { stateReducer, TASK_ONCHANGE, TASK_VALIDATE, validatorReducer } from '../modals-helpers';
import { checkAllFormValidity } from '../../../utilities/form-validators';

export default function CreateTask({ closeFunc, usersList, liftUpCreateTask }) {
  const newTaskRef = useRef(createElemRefOnDB(TASKS));
  const onChangeSnapshot = useRef({});

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

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(checkAllFormValidity(validator.validator));
  }, [validator.validator]);

  useEffect(() => {
    dispatchValidator({ type: TASK_VALIDATE, payload: { state, event: onChangeSnapshot.current } });
  }, [state.title, state.startDate, state.deadLine, state.selectedUsers]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    onChangeSnapshot.current = { name, value, type };
    dispatchState({ type: TASK_ONCHANGE, payload: { name, value, type } });
  };

  const createTask = () => {
    liftUpCreateTask(newTaskRef.current, state);
    closeFunc();
  };

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
          <Button onClick={() => closeFunc()}>Close</Button>
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
