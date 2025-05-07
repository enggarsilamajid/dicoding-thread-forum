import { api } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await api.seeDetailThread(threadId);

      const detailThreadWithVotes = {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy || [],
        downVotesBy: detailThread.downVotesBy || [],
        comments: detailThread.comments.map((comment) => ({
          ...comment,
          hasUpVoted: comment.upVotesBy.includes(detailThread.userId),
          hasDownVoted: comment.downVotesBy.includes(detailThread.userId),
        })),
      };

      dispatch(receiveDetailThreadActionCreator(detailThreadWithVotes));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  asyncReceiveDetailThread,
};