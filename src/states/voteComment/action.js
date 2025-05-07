import { api } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function asyncUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();
    const userId = authUser?.id;

    if (!detailThread) {
      alert('Thread belum dimuat.');
      dispatch(hideLoading());
      return;
    }

    const comment = detailThread.comments.find((c) => c.id === commentId);
    if (!comment) {
      alert(`Komentar dengan ID ${commentId} tidak ditemukan.`);
      dispatch(hideLoading());
      return;
    }

    const voteStatus = getState().voteComment[commentId] || { upVotesBy: [], downVotesBy: [] };
    const hasUpVoted = voteStatus.upVotesBy.includes(userId);
    const hasDownVoted = voteStatus.downVotesBy.includes(userId);

    if (hasUpVoted) {
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
    } else {
      if (hasDownVoted) {
        dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
      }
      dispatch(upVoteCommentActionCreator({ commentId, userId }));
    }

    try {
      if (hasUpVoted) {
        await api.neutralizeVoteComment(threadId, commentId);
      } else {
        if (hasDownVoted) {
          await api.neutralizeVoteComment(threadId, commentId);
        }
        await api.upVoteComment(threadId, commentId);
      }
    } catch (error) {
      alert(`Gagal upvote komentar: ${error.message}`);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();
    const userId = authUser?.id;

    if (!detailThread) {
      alert('Thread belum dimuat.');
      dispatch(hideLoading());
      return;
    }

    const comment = detailThread.comments.find((c) => c.id === commentId);
    if (!comment) {
      alert(`Komentar dengan ID ${commentId} tidak ditemukan.`);
      dispatch(hideLoading());
      return;
    }

    const voteStatus = getState().voteComment[commentId] || { upVotesBy: [], downVotesBy: [] };
    const hasUpVoted = voteStatus.upVotesBy.includes(userId);
    const hasDownVoted = voteStatus.downVotesBy.includes(userId);

    if (hasDownVoted) {
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
    } else {
      if (hasUpVoted) {
        dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
      }
      dispatch(downVoteCommentActionCreator({ commentId, userId }));
    }

    try {
      if (hasDownVoted) {
        await api.neutralizeVoteComment(threadId, commentId);
      } else {
        if (hasUpVoted) {
          await api.neutralizeVoteComment(threadId, commentId);
        }
        await api.downVoteComment(threadId, commentId);
      }
    } catch (error) {
      alert(`Gagal downvote komentar: ${error.message}`);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncUpVoteComment,
  asyncDownVoteComment,
};