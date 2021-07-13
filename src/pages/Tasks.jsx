import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import classes from './Tasks.module.css';
import Task from '../components/Task/Task';
import Modal from '../components/Modals/Modal';
import {
  setElemToDB,
  deleteElemFromDB,
  editElemInDB,
  TASKS,
  addTaskToUser,
  deleteTaskFromUser,
  editTaskInUsers,
} from '../utilities/fb-helpers';
import fetchTasks from '../store/actionCreators/fetchTasks';
import openCreateTaskModal from '../store/actionCreators/openCreateTaskModal';
import toggleModal from '../store/actionCreators/toggleModal';

class Tasks extends React.PureComponent {
  deleteTask = (selectedId) => {
    const { fetchTasks, tasksList } = this.props;
    const assignedUsers = tasksList.find((task) => task.id === selectedId).selectedUsers;
    deleteElemFromDB(TASKS, selectedId, fetchTasks);
    assignedUsers.forEach((assignedUserId) => deleteTaskFromUser(selectedId, assignedUserId));
  };

  editTask = (editedTask) => {
    const { fetchTasks, tasksList } = this.props;
    const prevAssignedUsers = tasksList.find((task) => task.id === editedTask.id).selectedUsers;
    const newAssignedUsers = editedTask.selectedUsers;
    const usersToUnassign = prevAssignedUsers.filter((assignedUserId) => !newAssignedUsers.includes(assignedUserId));
    const usersToAssign = newAssignedUsers.filter((assignedUserId) => !prevAssignedUsers.includes(assignedUserId));
    editElemInDB(TASKS, editedTask, fetchTasks);
    editTaskInUsers(usersToAssign, usersToUnassign, editedTask.id);
  };

  createTask = (newTaskRef, newTask) => {
    const { fetchTasks } = this.props;
    const newTaskId = newTask.id;
    const assignedUsers = newTask.selectedUsers;
    setElemToDB(newTaskRef, newTask, fetchTasks);
    assignedUsers.forEach((assignedUserId) => addTaskToUser(newTaskId, assignedUserId));
  };

  render() {
    const { loading, tasksList, usersList, isModalOpen, selectedModal, openCreateTaskModal, toggleModal } = this.props;

    if (loading) {
      return <Loader />;
    }

    const tasks = tasksList.map((task, index) => {
      return (
        <Task
          usersList={usersList}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          key={task.id}
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
          <Button roleClass='create' onClick={openCreateTaskModal}>
            Create
          </Button>
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
        {isModalOpen ? (
          <Modal list={usersList} closeFunc={toggleModal} actFunc={this.createTask} selectedModal={selectedModal} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasksList: state.tasks.tasksList,
    usersList: state.users.usersList,
    selectedModal: state.app.selectedModal,
    loading: state.app.loading,
    isModalOpen: state.app.isModalOpen,
  };
};

const mapDispatchToProps = {
  fetchTasks,
  openCreateTaskModal,
  toggleModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

Tasks.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  openCreateTaskModal: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  tasksList: PropTypes.instanceOf(Array).isRequired,
  usersList: PropTypes.instanceOf(Array).isRequired,
  selectedModal: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};
