import { ActionType } from './action';

const initialState = {};

function voteThreadReducer(state = initialState, action) {
  const { threadId, userId } = action.payload || {};

  if (!threadId || !userId) return state;

  const currentThreadVotes = state[threadId] || {
    upVotesBy: [],
    downVotesBy: [],
  };

  switch (action.type) {
  case ActionType.UPVOTE_THREAD: {
    const newUpVotesBy = [...new Set([...currentThreadVotes.upVotesBy, userId])];
    const newDownVotesBy = currentThreadVotes.downVotesBy.filter((id) => id !== userId);

    return {
      ...state,
      [threadId]: {
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy,
      },
    };
  }

  case ActionType.DOWNVOTE_THREAD: {
    const newDownVotesBy = [...new Set([...currentThreadVotes.downVotesBy, userId])];
    const newUpVotesBy = currentThreadVotes.upVotesBy.filter((id) => id !== userId);

    return {
      ...state,
      [threadId]: {
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy,
      },
    };
  }

  case ActionType.NEUTRALIZE_VOTE_THREAD: {
    const newUpVotesBy = currentThreadVotes.upVotesBy.filter((id) => id !== userId);
    const newDownVotesBy = currentThreadVotes.downVotesBy.filter((id) => id !== userId);

    return {
      ...state,
      [threadId]: {
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy,
      },
    };
  }

  default:
    return state;
  }
}

export { voteThreadReducer };