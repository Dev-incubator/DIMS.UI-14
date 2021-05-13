import React from 'react';
import classes from './Track.module.css';
import noop from '../../shared/noop';
import DivAnchor from '../DivAnchor';
import Button from '../Button/Button';
import Modal from '../Modals/Modal';
import { internationalizeDate } from '../../utilities/internationalization';
import {
  TRACK_MODAL_TOGGLE,
  TRACK_MODAL_DELETE_TRACK,
  TRACK_MODAL_SHOW_TRACK,
  TRACK_MODAL_EDIT_TRACK,
  reducerFunc,
} from './Track-helpers';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: TRACK_MODAL_TOGGLE, modalType }));
  }

  render() {
    const { isOpen, selectedModal } = this.state;
    const openDeleteModal = () => this.toggleModal(TRACK_MODAL_DELETE_TRACK);
    const openShowModal = () => this.toggleModal(TRACK_MODAL_SHOW_TRACK);
    const openEditModal = () => this.toggleModal(TRACK_MODAL_EDIT_TRACK);
    const closeAnyModal = () => this.toggleModal();

    return (
      <>
        <div className={classes.item}>
          <div>tableIndex</div>
          <DivAnchor onClick={openShowModal}>lol</DivAnchor>
          <div>note</div>
          <div>{internationalizeDate('2020-10-10')}</div>
          <div className={classes.buttons}>
            <Button roleClass='edit' onClick={openEditModal}>
              Edit
            </Button>
            <Button roleClass='delete' onClick={openDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        {isOpen ? <Modal closeFunc={closeAnyModal} actFunc={noop} selectedModal={selectedModal} /> : null}
      </>
    );
  }
}
