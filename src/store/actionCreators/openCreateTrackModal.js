import TRACKS_MODAL_CREATE_TRACK from '../actions/openCreateTrackModal';

import toggleModal from './toggleModal';

const openCreateTrackModal = () => toggleModal(TRACKS_MODAL_CREATE_TRACK);

export default openCreateTrackModal;
