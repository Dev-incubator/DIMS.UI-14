import { UserContext } from '../RootProvider/userContext';
import Login from '../../pages/Login';

export default function LoginWithContext() {
  return <UserContext.Consumer>{(userContext) => <Login {...userContext} />}</UserContext.Consumer>;
}
