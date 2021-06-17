import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../pages/Login';
import classes from './App.module.css';
import Main from '../components/Main/Main';
import { getRoleDependedRoutes } from '../components/Routes';
import PageNotFound from '../pages/PageNotFound';

const App = ({ userContext, userContext: { isLogged, loggedUser } }) => {
  const routes = isLogged ? getRoleDependedRoutes(loggedUser) : null;
  const isLoggedRedirector = isLogged ? null : <Redirect to='/' />;

  return (
    <>
      <BrowserRouter>
        <div className={classes.app}>
          <Switch>
            <Route exact path='/' render={(props) => <Login {...props} {...userContext} />} />
            <Route path='/main' render={(props) => <Main {...props} routes={routes} />} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
        {isLoggedRedirector}
      </BrowserRouter>
    </>
  );
};

export default App;

App.propTypes = {
  userContext: PropTypes.shape({
    isLogged: PropTypes.bool,
    loggedUser: PropTypes.instanceOf(Object),
  }).isRequired,
};
