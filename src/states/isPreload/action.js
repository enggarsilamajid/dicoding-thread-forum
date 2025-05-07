import { api } from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreLoad) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreLoad,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const token = api.getAccessToken();

      if (token) {
        const authUser = await api.seeOwnProfile();
        dispatch(setAuthUserActionCreator(authUser));
      } else {
        dispatch(setAuthUserActionCreator(null));
      }
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess
};