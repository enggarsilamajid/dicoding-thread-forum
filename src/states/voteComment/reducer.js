import { ActionType } from './action';

const initialState = {};

function voteCommentReducer(state = initialState, action) {
  const { commentId, userId } = action.payload || {};

  if (!commentId || !userId) return state;

  switch (action.type) {
  case ActionType.UPVOTE_COMMENT:
    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        upVotesBy: state[commentId]?.upVotesBy
          ? [...new Set([...state[commentId].upVotesBy, userId])]
          : [userId],
        downVotesBy: state[commentId]?.downVotesBy
          ? state[commentId].downVotesBy.filter((id) => id !== userId)
          : [],
      },
    };

  case ActionType.DOWNVOTE_COMMENT:
    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        downVotesBy: state[commentId]?.downVotesBy
          ? [...new Set([...state[commentId].downVotesBy, userId])]
          : [userId],
        upVotesBy: state[commentId]?.upVotesBy
          ? state[commentId].upVotesBy.filter((id) => id !== userId)
          : [],
      },
    };

  case ActionType.NEUTRALIZE_VOTE_COMMENT:
    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        upVotesBy: state[commentId]?.upVotesBy.filter((id) => id !== userId),
        downVotesBy: state[commentId]?.downVotesBy.filter((id) => id !== userId),
      },
    };

  default:
    return state;
  }
}

export { voteCommentReducer };