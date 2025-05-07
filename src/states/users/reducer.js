import { ActionType } from './action';

function usersReducer(users = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_ALL_USERS:
    return action.payload.users;
  default:
    return users;
  }
}

export { usersReducer };