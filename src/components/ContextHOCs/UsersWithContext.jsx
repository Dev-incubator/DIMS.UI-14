import { UserContext } from '../../App/userContext';
import Users from '../../pages/Users';

export default function UsersWithContext(props) {
  return <UserContext.Consumer>{(userContext) => <Users {...props} {...userContext} />}</UserContext.Consumer>;
}
