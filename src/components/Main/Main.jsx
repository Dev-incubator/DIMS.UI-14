import React from 'react';
import PropTypes from 'prop-types';
import classes from './Main.module.css';
import Header from './Header/Header';
import Aside from '../Aside/Aside';
import { reducerFunc, TOGGLE_MENU } from './main-helpers';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState((prevState) => reducerFunc(prevState, { type: TOGGLE_MENU }));
  }

  render() {
    const { isOpen } = this.state;
    const { routes } = this.props;

    return (
      <div className={classes.wrapper}>
        <Aside isOpen={isOpen} />
        <main className={classes.main}>
          <Header toggleMenu={this.toggleMenu} isOpen={isOpen} />
          <div className={classes.screen}>{routes}</div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  routes: PropTypes.instanceOf(Object),
};

Main.defaultProps = {
  routes: {},
};
