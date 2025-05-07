import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_COMMENTS:
    return action.payload.comments;
  case ActionType.ADD_NEW_COMMENT:
    return [action.payload.comment, ...comments];
  default:
    return comments;
  }
}

export { commentsReducer };
