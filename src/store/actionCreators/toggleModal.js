import TOGGLE_MODAL from '../actions/toggleModal';

const toggleModal = (modalType = '') => ({ type: TOGGLE_MODAL, payload: modalType });

export default toggleModal;
