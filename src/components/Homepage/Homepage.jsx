import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginHeader from './HomeHeader';
import About from '../../pages/About';
import LoginWithContext from '../ContextHOCs/LoginWithContext';
import PageNotFound from '../../pages/PageNotFound';

export default function Homepage({ isLogged }) {
  const isLoggedRedirector = isLogged ? <Redirect to='/login' /> : null;

  return (
    <>
      <LoginHeader />
      <Switch>
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={LoginWithContext} />
        <Route component={PageNotFound} />
      </Switch>
      {isLoggedRedirector}
    </>
  );
}

Homepage.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};
