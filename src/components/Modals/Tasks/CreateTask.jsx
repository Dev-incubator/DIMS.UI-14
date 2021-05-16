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
import { TASKS, createElemRefOnDB } from '../../../utilities/fb-helpers';
import debounce from '../../../utilities/debounce';

export default class CreateTask extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: '',
        description: '',
        startDate: '',
        deadLine: '',
        selectedUsers: [],
        id: '',
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
      newTaskRef: createElemRefOnDB(TASKS),
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
        id: prevState.newTaskRef.id,
      },
      usersList,
    }));
  }

  onChange(event) {
    const {
      target: { name, value, type: targetType },
    } = event;
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
    const { liftUpCreateTask } = this.props;
    const { data, newTaskRef } = this.state;
    const newTask = { ...data };
    liftUpCreateTask(newTaskRef, newTask);
    this.closeModal();
  }

  render() {
    const {
      isValid,
      data: { title, description, startDate, deadLine, selectedUsers },
      usersList,
      errors: { titleError, startDateError, deadLineError, selectedUsersError },
    } = this.state;

    return (
      <div className={classes.modal}>
        <h3 className={classes.title}>Create Task</h3>
        <form>
          <div className={classes.wrapper}>
            <CraftInput title='Title' isRequired id='title' value={title} onChange={this.onChange} error={titleError} />
            <CraftInput title='Description' id='description' value={description} onChange={this.onChange} />
            <CraftInput
              title='Start Date'
              id='startDate'
              isRequired
              type='date'
              value={startDate}
              onChange={this.onChange}
              error={startDateError}
            />
            <CraftInput
              title='DeadLine'
              isRequired
              id='deadLine'
              type='date'
              value={deadLine}
              onChange={this.onChange}
              error={deadLineError}
            />
            <CraftInput
              title='Users'
              isRequired
              id='selectedUsers'
              type='checkbox'
              value={selectedUsers}
              options={usersList}
              onChange={this.onChange}
              error={selectedUsersError}
            />
          </div>
          <div className={classes.requiredwarning}>* - these fields are required.</div>
          <div className={classes.buttons}>
            <Button onClick={this.liftUpCreateTask} roleClass='create' disabled={!isValid}>
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
  usersList: PropType.instanceOf(Array).isRequired,
  liftUpCreateTask: PropType.func.isRequired,
};
