import React from 'react';
import PropType from 'prop-types';
import classes from './Track.module.css';
import noop from '../../shared/noop';
import Button from '../Button/Button';
import Modal from '../Modals/Modal';
import { internationalizeDate } from '../../utilities/internationalization';
import { TRACK_MODAL_TOGGLE, TRACK_MODAL_DELETE_TRACK, TRACK_MODAL_EDIT_TRACK, reducerFunc } from './Track-helpers';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.liftUpDeleteTrack = this.liftUpDeleteTrack.bind(this);
    this.liftUpEditTrack = this.liftUpEditTrack.bind(this);
  }

  liftUpDeleteTrack() {
    const {
      deleteTrack,
      track: { id },
    } = this.props;
    deleteTrack(id);
  }

  liftUpEditTrack(editedTrack) {
    const { editTrack } = this.props;
    editTrack(editedTrack);
  }

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: TRACK_MODAL_TOGGLE, modalType }));
  }

  render() {
    const {
      tableIndex,
      track,
      track: { date, note },
      taskData: { title, startDate },
    } = this.props;
    const { isOpen, selectedModal } = this.state;
    const openDeleteModal = () => this.toggleModal(TRACK_MODAL_DELETE_TRACK);
    const openEditModal = () => this.toggleModal(TRACK_MODAL_EDIT_TRACK);
    const closeAnyModal = () => this.toggleModal();

    const selectActFunc = () => {
      switch (selectedModal) {
        case TRACK_MODAL_DELETE_TRACK:
          return () => this.liftUpDeleteTrack();
        case TRACK_MODAL_EDIT_TRACK:
          return (editedTrack) => this.liftUpEditTrack(editedTrack);
        default:
          return () => noop;
      }
    };

    const trackCopy = { ...track, title, startDate };

    return (
      <>
        <div className={classes.item}>
          <div>{tableIndex}</div>
          <div>{title}</div>
          <div>{note}</div>
          <div>{internationalizeDate(date)}</div>
          <div className={classes.buttons}>
            <Button roleClass='edit' onClick={openEditModal}>
              Edit
            </Button>
            <Button roleClass='delete' onClick={openDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        {isOpen ? (
          <Modal item={trackCopy} closeFunc={closeAnyModal} actFunc={selectActFunc()} selectedModal={selectedModal} />
        ) : null}
      </>
    );
  }
}

Track.propTypes = {
  tableIndex: PropType.number.isRequired,
  taskData: PropType.instanceOf(Object).isRequired,
  track: PropType.shape({
    id: PropType.string,
    date: PropType.string,
    note: PropType.string,
  }).isRequired,
  editTrack: PropType.func.isRequired,
  deleteTrack: PropType.func.isRequired,
};
