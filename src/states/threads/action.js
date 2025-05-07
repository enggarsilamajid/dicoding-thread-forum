import { api } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_ALL_THREADS: 'RECEIVE_ALL_THREADS',
  ADD_NEW_THREAD: 'ADD_NEW_THREAD',
};

function receiveAllThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_ALL_THREADS,
    payload: {
      threads,
    },
  };
}

function addNewThreadsActionCreator(thread) {
  return {
    type: ActionType.ADD_NEW_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncAddNewThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const newThread = await api.addThread({ title, body, category });
      console.log('New thread has been posted:', newThread);
      dispatch(addNewThreadsActionCreator(newThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export { ActionType, receiveAllThreadsActionCreator, addNewThreadsActionCreator, asyncAddNewThread };