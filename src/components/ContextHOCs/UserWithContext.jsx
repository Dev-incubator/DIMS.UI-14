import { UserContext } from '../RootProvider/userContext';
import User from '../User/User';

export default function UserWithContext(props) {
  return <UserContext.Consumer>{(userContext) => <User {...props} {...userContext} />}</UserContext.Consumer>;
}
