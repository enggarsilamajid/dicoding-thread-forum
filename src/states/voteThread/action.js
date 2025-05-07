import { api } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
};

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: { threadId, userId },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: { threadId, userId },
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: { threadId, userId },
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();
    const userId = authUser?.id;

    if (!detailThread) {
      alert('Thread belum dimuat.');
      dispatch(hideLoading());
      return;
    }

    const hasUpVoted = detailThread.upVotesBy.includes(userId);
    const hasDownVoted = detailThread.downVotesBy.includes(userId);

    if (hasUpVoted) {
      dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
    } else {
      if (hasDownVoted) {
        dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
      }
      dispatch(upVoteThreadActionCreator({ threadId, userId }));
    }

    try {
      if (hasUpVoted) {
        await api.neutralizeVoteThread(threadId);
      } else {
        if (hasDownVoted) {
          await api.neutralizeVoteThread(threadId);
        }
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(`Gagal upvote thread: ${error.message}`);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();
    const userId = authUser?.id;

    if (!detailThread) {
      alert('Thread belum dimuat.');
      dispatch(hideLoading());
      return;
    }

    const hasDownVoted = detailThread.downVotesBy.includes(userId);
    const hasUpVoted = detailThread.upVotesBy.includes(userId);

    if (hasDownVoted) {
      dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
    } else {
      if (hasUpVoted) {
        dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
      }
      dispatch(downVoteThreadActionCreator({ threadId, userId }));
    }

    try {
      if (hasDownVoted) {
        await api.neutralizeVoteThread(threadId);
      } else {
        if (hasUpVoted) {
          await api.neutralizeVoteThread(threadId);
        }
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(`Gagal downvote thread: ${error.message}`);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
};