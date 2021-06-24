import USERS_MODAL_CREATE_USER from '../actions/openCreateUserModal';
import toggleModal from './toggleModal';

const openCreateUserModal = () => toggleModal(USERS_MODAL_CREATE_USER);

export default openCreateUserModal;
