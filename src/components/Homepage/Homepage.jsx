import { Route, Switch } from 'react-router-dom';
import LoginHeader from './HomeHeader';
import About from '../../pages/About';
import LoginWithContext from '../ContextHOCs/LoginWithContext';
import PageNotFound from '../../pages/PageNotFound';

export default function Homepage() {
  return (
    <>
      <LoginHeader />
      <Switch>
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={LoginWithContext} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}
