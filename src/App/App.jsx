import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Aside from '../components/Aside/Aside';
import Main from '../components/Main/Main';
import classes from './App.module.css';
import { reducerFunc, TOGGLE_MENU } from './App-helpers';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        menu: {
          isOpen: false,
        },
      },
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState((prevState) => reducerFunc(prevState, { type: TOGGLE_MENU }));
  }

  render() {
    const {
      settings: {
        menu: { isOpen },
      },
    } = this.state;

    return (
      <BrowserRouter>
        <div className={classes.app}>
          <Aside isOpen={isOpen} />
          <Main isOpen={isOpen} toggleMenu={this.toggleMenu} />
        </div>
      </BrowserRouter>
    );
  }
}
