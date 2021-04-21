import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './Task.module.css';

export default function Task({ actionTypes, modalTypes, taskData, tableIndex, dispatch }) {
  const { id, taskName, description, startDate, deadline } = taskData;

  const { deleteTask } = modalTypes;
  const { toggleModal } = actionTypes;

  const openDeleteModal = () => {
    dispatch({ type: toggleModal, modalType: deleteTask, selectedID: id });
  };

  return (
    <div className={classes.item}>
      <div>{tableIndex}</div>
      <div>{taskName}</div>
      <div>{description}</div>
      <div>{startDate}</div>
      <div>{deadline}</div>
      <div className={classes.buttons}>
        <Button roleclass='edit' onClick={() => {}}>
          Edit
        </Button>
        <Button roleclass='delete' onClick={openDeleteModal}>
          Delete
        </Button>
      </div>
    </div>
  );
}

Task.propTypes = {
  dispatch: PropType.func.isRequired,
  taskData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  modalTypes: PropType.instanceOf(Object).isRequired,
  actionTypes: PropType.instanceOf(Object).isRequired,
};
