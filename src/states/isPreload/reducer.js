import { ActionType } from './action';

function isPreloadReducer(isPreLoad = true, action = {}) {
  switch (action.type) {
  case ActionType.SET_IS_PRELOAD:
    return action.payload.isPreLoad;
  default:
    return isPreLoad;
  }
}

export { isPreloadReducer };