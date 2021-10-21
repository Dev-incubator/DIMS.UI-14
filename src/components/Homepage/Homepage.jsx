import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import About from '../../pages/About';
import LoginWithContext from '../ContextHOCs/LoginWithContext';
import PageNotFound from '../../pages/PageNotFound';

export default function Homepage() {
  return (
    <>
      <HomeHeader />
      <Switch>
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={LoginWithContext} />
        <Route exact path='/' render={() => <Redirect to='/login' />} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}
