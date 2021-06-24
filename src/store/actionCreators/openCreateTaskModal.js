import TASKS_MODAL_CREATE_TASK from '../actions/openCreateTaskModal';
import toggleModal from './toggleModal';

const openCreateTaskModal = () => toggleModal(TASKS_MODAL_CREATE_TASK);

export default openCreateTaskModal;
