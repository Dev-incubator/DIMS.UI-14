import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Aside from '../components/Aside/Aside';
import Main from '../components/Main/Main';
import classes from './App.module.css';
import reducerFunc from '../utilities/reducer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        menu: {
          isOpen: true,
        },
      },
    };
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(action) {
    this.setState((prevState) => reducerFunc(prevState, action));
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
          <Main isOpen={isOpen} dispatch={this.dispatch} />
        </div>
      </BrowserRouter>
    );
  }
}
