import PropType from 'prop-types';
import React from 'react';
import classes from './CreateTask.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';

import { EDIT_TASK_ONCHANGE, EDIT_TASK_VALIDATE_FIELDS, EDIT_TASK_VALIDATE_FORM, reducerFunc } from './Task-helpers';
import { db, USERS } from '../../../utilities/fb-helpers';
import debounce from '../../../utilities/debounce';

export default class EditTask extends React.PureComponent {
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
        title: true,
        startDate: true,
        deadLine: true,
        selectedUsers: true,
      },
      usersList: [],
      isValid: true,
      errors: {
        titleError: '',
        startDateError: '',
        deadLineError: '',
        selectedUsersError: '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.liftUpEditTask = this.liftUpEditTask.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const { task } = this.props;
    db.collection(USERS)
      .get()
      .then((querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push(doc.data());
        });

        return usersList;
      })
      .then((usersList) =>
        this.setState((prevState) => ({
          ...prevState,
          data: {
            ...task,
          },
          usersList,
        })),
      )
      .catch((error) => {
        console.log('Error reading USERS collection: ', error);
      });
  }

  onChange(event) {
    const { target } = event;
    const { name, value } = target;
    const targetType = target.type;
    this.setState(
      (prevState) =>
        reducerFunc(prevState, {
          type: EDIT_TASK_ONCHANGE,
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
      type: EDIT_TASK_VALIDATE_FIELDS,
      fieldName,
      fieldValue,
      targetType,
    });
    this.setState(state, this.validateForm);
  }

  validateForm() {
    const state = reducerFunc(this.state, {
      type: EDIT_TASK_VALIDATE_FORM,
    });
    this.setState(state);
  }

  closeModal() {
    const { closeFunc } = this.props;
    closeFunc();
  }

  liftUpEditTask() {
    const { liftUpEditTask } = this.props;
    const { data } = this.state;
    const editedTask = { ...data };
    liftUpEditTask(editedTask);
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
            <Button onClick={this.liftUpEditTask} roleClass='edit' disabled={!isValid}>
              Edit
            </Button>
            <Button onClick={this.closeModal}>Close</Button>
          </div>
        </form>
      </div>
    );
  }
}

EditTask.propTypes = {
  closeFunc: PropType.func.isRequired,
  liftUpEditTask: PropType.func.isRequired,
  task: PropType.instanceOf(Object).isRequired,
};
