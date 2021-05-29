import React from 'react';
import PropType from 'prop-types';
import classes from './Track.module.css';
import Button from '../Button/Button';
import Modal from '../Modals/Modal';
import { getInternationalDate } from '../../utilities/internationalization';
import { TRACK_MODAL_TOGGLE, TRACK_MODAL_DELETE_TRACK, TRACK_MODAL_EDIT_TRACK, reducerFunc } from './track-helpers';

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
    this.selectActFunc = this.selectActFunc.bind(this);
  }

  openDeleteModal = () => this.toggleModal(TRACK_MODAL_DELETE_TRACK);

  openEditModal = () => this.toggleModal(TRACK_MODAL_EDIT_TRACK);

  closeAnyModal = () => this.toggleModal();

  getExtendedTrack = (track, title, startDate) => ({ ...track, title, startDate });

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

  selectActFunc(editedTrack = {}) {
    const { selectedModal } = this.state;
    if (selectedModal === TRACK_MODAL_DELETE_TRACK) {
      this.liftUpDeleteTrack();
    } else if (selectedModal === TRACK_MODAL_EDIT_TRACK) {
      this.liftUpEditTrack(editedTrack);
    }
  }

  render() {
    const {
      tableIndex,
      track,
      track: { date, note },
      taskData: { title, startDate },
    } = this.props;
    const { isOpen, selectedModal } = this.state;

    const extendedTrack = this.getExtendedTrack(track, title, startDate);

    return (
      <>
        <div className={classes.item}>
          <div>{tableIndex}</div>
          <div>{title}</div>
          <div>{note}</div>
          <div>{getInternationalDate(date)}</div>
          <div className={classes.buttons}>
            <Button roleClass='edit' onClick={this.openEditModal}>
              Edit
            </Button>
            <Button roleClass='delete' onClick={this.openDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        {isOpen ? (
          <Modal
            item={extendedTrack}
            closeFunc={this.closeAnyModal}
            actFunc={this.selectActFunc}
            selectedModal={selectedModal}
          />
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
