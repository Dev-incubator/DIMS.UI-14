import React from 'react';
import classes from './Track.module.css';
import noop from '../../shared/noop';
import DivAnchor from '../DivAnchor';
import Button from '../Button/Button';
import { internationalizeDate } from '../../utilities/internationalization';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lol: 'kek',
    };
  }

  render() {
    const { lol } = this.state;

    return (
      <>
        <div className={classes.item}>
          <div>tableIndex</div>
          <DivAnchor onClick={noop}>{lol}</DivAnchor>
          <div>note</div>
          <div>{internationalizeDate('2020-10-10')}</div>
          <div className={classes.buttons}>
            <Button roleClass='edit' onClick={noop}>
              Edit
            </Button>
            <Button roleClass='delete' onClick={noop}>
              Delete
            </Button>
          </div>
        </div>
      </>
    );
  }
}
