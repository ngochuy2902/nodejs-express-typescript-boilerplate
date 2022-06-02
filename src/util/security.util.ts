import app from '../config/express';
import UserContext from '../type/user-context.type';

const getCurrentUserId = () => {
  if (!app?.locals) {
    return 0;
  }
  const userContext: UserContext = app.locals['userContext'];
  if (!userContext) {
    return 0;
  }
  return userContext.id;
};

export default { getCurrentUserId };
