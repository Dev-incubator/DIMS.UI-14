import PropType from 'prop-types';
import React from 'react';
import Button from '../components/Button/Button';
import classes from './Tasks.module.css';
import Task from '../components/Task/Task';
import Modal from '../components/Modals/Modal';

//  Function types
const DELETE_TASK = 'delete-task';
const TOGGLE_MODAL = 'toggle-modal';
export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSettings: {
        selectedID: '',
        isOpen: false,
        selectedModal: '',
      },
      actionTypes: {
        toggleModal: TOGGLE_MODAL,
        deleteTask: DELETE_TASK,
      },
      tasksList: [],
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      tasksList: [
        {
          id: 1,
          taskName: 'Create database project',
          description: 'Create database project in firebase',
          startDate: '01.11.2020',
          deadline: '07.11.2020',
        },
        {
          id: 2,
          taskName: 'Create repositories',
          description: 'Create tasks, members, progress repositories',
          startDate: '07.11.2020',
          deadline: '14.11.2020',
        },
        {
          id: 3,
          taskName: 'Create unit tests for repositories',
          description: '',
          startDate: '07.11.2020',
          deadline: '21.11.2020',
        },
        {
          id: 4,
          taskName: 'Create services',
          description: '',
          startDate: '18.11.2020',
          deadline: '25.11.2020',
        },
        {
          id: 5,
          taskName: 'Create unit tests for services',
          description: '',
          startDate: '18.11.2020',
          deadline: '30.11.2020',
        },
        {
          id: 6,
          taskName: 'Create controllers',
          description: '',
          startDate: '01.12.2020',
          deadline: '07.12.2020',
        },
        {
          id: 7,
          taskName: 'Create unit tests for controllers',
          description: '',
          startDate: '01.12.2020',
          deadline: '14.12.2020',
        },
        {
          id: 8,
          taskName: 'Create views',
          description: '',
          startDate: '14.12.2020',
          deadline: '21.12.2020',
        },
      ],
    }));
  }

  dispatch(action) {
    switch (action.type) {
      case DELETE_TASK:
        this.deleteTask();
        break;
      case TOGGLE_MODAL:
        this.toggleModal(action.modalType, action.selectedID);
        break;
      default:
        console.log('something with dispatcher went wrong...');
        break;
    }
  }

  deleteTask() {
    this.setState((prevState) => ({
      ...prevState,
      tasksList: prevState.tasksList.filter((item) => item.id !== prevState.modalSettings.selectedID),
    }));
  }

  toggleModal(modalType = '', selectedID = '') {
    this.setState((prevState) => ({
      ...prevState,
      modalSettings: {
        ...prevState.modalSettings,
        isOpen: !prevState.modalSettings.isOpen,
        selectedModal: modalType,
        selectedID,
      },
    }));
  }

  render() {
    const { tasksList, actionTypes, modalSettings } = this.state;
    const { modalTypes } = this.props;

    const tasks = tasksList.map((task, index) => {
      return (
        <Task
          actionTypes={actionTypes}
          modalTypes={modalTypes}
          dispatch={this.dispatch}
          key={task.id.toString()}
          taskData={task}
          tableIndex={index + 1}
        />
      );
    });

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            Tasks <span>({`${tasksList.length}`})</span>
          </h2>
          <Button>Create</Button>
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Task Name</div>
            <div>Description</div>
            <div>Start Date</div>
            <div>Deadline</div>
            <div>Controls</div>
          </div>
          {tasks}
        </div>
        <Modal
          modalTypes={modalTypes}
          actionTypes={actionTypes}
          dispatch={this.dispatch}
          list={tasksList}
          modalSettings={modalSettings}
        />
      </div>
    );
  }
}

Tasks.propTypes = {
  modalTypes: PropType.instanceOf(Object).isRequired,
};
