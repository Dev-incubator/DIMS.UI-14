import PropType from 'prop-types';
import React from 'react';
import classes from './CreateTask.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';

import {
  CREATE_TASK_ONCHANGE,
  CREATE_TASK_VALIDATE_FIELDS,
  CREATE_TASK_VALIDATE_FORM,
  reducerFunc,
} from './Task-helpers';
import { TASKS, createElemRef } from '../../../utilities/fb-helpers';
import debounce from '../../../utilities/debounce';

const newTaskRef = createElemRef(TASKS);

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: '',
        description: '',
        startDate: '',
        deadLine: '',
        selectedUsers: [],
      },
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
      usersList: [],
      isValid: false,
    };
    this.onChange = this.onChange.bind(this);
    this.liftUpCreateTask = this.liftUpCreateTask.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const { usersList } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        id: newTaskRef.id,
      },
      usersList,
    }));
  }

  onChange(event) {
    const { target } = event;
    const { name, value } = target;
    const targetType = target.type;
    this.setState(
      (prevState) =>
        reducerFunc(prevState, {
          type: CREATE_TASK_ONCHANGE,
          name,
          value,
          targetType,
        }),
      debounce(() => {
        this.validateFields(name, value, targetType);
      }, 1000),
    );
  }

  validateFields(fieldName, fieldValue, targetType) {
    const state = reducerFunc(this.state, {
      type: CREATE_TASK_VALIDATE_FIELDS,
      fieldName,
      fieldValue,
      targetType,
    });
    this.setState(state, this.validateForm);
  }

  validateForm() {
    const state = reducerFunc(this.state, {
      type: CREATE_TASK_VALIDATE_FORM,
    });
    this.setState(state);
  }

  closeModal() {
    const { closeFunc } = this.props;
    closeFunc();
  }

  liftUpCreateTask() {
    const { actFunc } = this.props;
    const { data } = this.state;
    const newTask = { ...data };
    actFunc(newTaskRef, newTask);
    this.closeModal();
  }

  render() {
    const {
      isValid,
      data: { title, description, startDate, deadLine, selectedUsers },
      usersList,
      errors: { titleError, startDateError, deadLineError, selectedUsersError },
    } = this.state;

    const handleChange = (event) => this.onChange(event);

    return (
      <div className={classes.modal}>
        <h3>Create Task</h3>
        <form>
          <div className={classes.wrapper}>
            <CraftInput title='Title' isRequired id='title' value={title} onChange={handleChange} error={titleError} />
            <CraftInput title='Description' id='description' value={description} onChange={handleChange} />
            <CraftInput
              title='Start Date'
              id='startDate'
              isRequired
              type='date'
              value={startDate}
              onChange={handleChange}
              error={startDateError}
            />
            <CraftInput
              title='DeadLine'
              isRequired
              id='deadLine'
              type='date'
              value={deadLine}
              onChange={handleChange}
              error={deadLineError}
            />
            <CraftInput
              title='Users'
              isRequired
              id='selectedUsers'
              type='checkbox'
              value={selectedUsers}
              options={usersList}
              onChange={handleChange}
              error={selectedUsersError}
            />
          </div>
          <div className={classes.requiredwarning}>* - these fields are required.</div>
          <div className={classes.buttons}>
            <Button onClick={this.liftUpCreateTask} roleclass='create' disabled={!isValid}>
              Create
            </Button>
            <Button onClick={this.closeModal}>Close</Button>
          </div>
        </form>
      </div>
    );
  }
}

CreateTask.propTypes = {
  closeFunc: PropType.func.isRequired,
  actFunc: PropType.func.isRequired,
  usersList: PropType.instanceOf(Array).isRequired,
};
