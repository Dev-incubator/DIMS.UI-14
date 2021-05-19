import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../pages/Login';
import classes from './App.module.css';
import Main from '../components/Main/Main';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className={classes.app}>
          <Route exact path='/' component={Login} />
          <Route exact path='/main/:path' component={Main} />
        </div>
      </BrowserRouter>
    </>
  );
}
