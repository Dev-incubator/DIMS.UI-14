import { UserContext } from '../RootProvider/userContext';
import App from '../../App/App';

export default function AppWithContext() {
  return <UserContext.Consumer>{(userContext) => <App {...userContext} />}</UserContext.Consumer>;
}
