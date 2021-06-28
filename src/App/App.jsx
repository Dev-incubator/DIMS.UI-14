import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './App.module.css';
import Main from '../components/Main/Main';
import { getRoleDependedRoutes } from '../components/Routes';
import Homepage from '../components/Homepage/Homepage';

const App = ({ isLogged, loggedUser }) => {
  const routes = isLogged ? getRoleDependedRoutes(loggedUser) : null;
  const isLoggedRedirector = isLogged ? null : <Redirect to='/login' />;

  return (
    <>
      <BrowserRouter>
        <div className={classes.app}>
          <Switch>
            <Route path='/main' render={(props) => <Main {...props} routes={routes} />} />
            <Route path='/' render={(props) => <Homepage {...props} isLogged={isLogged} />} />
          </Switch>
        </div>
        {isLoggedRedirector}
      </BrowserRouter>
    </>
  );
};

export default App;

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  loggedUser: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
};
