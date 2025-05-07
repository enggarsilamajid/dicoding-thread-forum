import { api } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveDetailThreadActionCreator } from '../detailThread/action';

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  ADD_NEW_COMMENT: 'ADD_NEW_COMMENT',
};

function receiveCommentsActionCreator(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: {
      comments,
    },
  };
}

function addNewCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_NEW_COMMENT,
    payload: {
      comment,
    },
  };
}

function asyncAddNewComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      if (content.trim()) {
        await api.commentThread({ threadId, content });

        const updatedThread = await api.seeDetailThread(threadId);
        const updatedComments = updatedThread.comments.filter((comment) => comment.threadId === threadId);

        dispatch(receiveCommentsActionCreator(updatedComments));
        dispatch(receiveDetailThreadActionCreator(updatedThread));
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment. Please try again later.');
    } finally {
      dispatch(hideLoading());
    }
  };
}


export { ActionType, receiveCommentsActionCreator, addNewCommentActionCreator, asyncAddNewComment };
