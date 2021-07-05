import PropTypes from 'prop-types';
import { useEffect, useReducer, useRef, useState } from 'react';
import classes from './EditTask.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';
import { stateReducer, TASK_ONCHANGE, TASK_VALIDATE, validatorReducer } from '../modals-helpers';
import { checkAllFormValidity } from '../../../utilities/form-validators';

export default function EditTask({ closeFunc, task, liftUpEditTask, usersList }) {
  const onChangeSnapshot = useRef({});
  const firstRender = useRef(true);

  const [state, dispatchState] = useReducer(stateReducer, undefined, () => ({
    ...task,
  }));

  const [validator, dispatchValidator] = useReducer(validatorReducer, undefined, () => ({
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
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }
    setIsValid(checkAllFormValidity(validator.validator));
  }, [validator.validator]);

  useEffect(() => {
    dispatchValidator({ type: TASK_VALIDATE, payload: { state, event: onChangeSnapshot.current } });
  }, [state.title, state.startDate, state.deadLine, state.selectedUsers]);

  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    onChangeSnapshot.current = { name, value, type };
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
