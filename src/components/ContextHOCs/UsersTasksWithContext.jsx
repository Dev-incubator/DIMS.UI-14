import { UserContext } from '../RootProvider/userContext';
import UsersTasks from '../../pages/UsersTasks';

export default function UsersTasksWithContext(props) {
  return <UserContext.Consumer>{(userContext) => <UsersTasks {...props} {...userContext} />}</UserContext.Consumer>;
}
