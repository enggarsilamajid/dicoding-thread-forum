import { ActionType as VoteCommentActionType } from '../voteComment/action';
import { ActionType as VoteThreadActionType } from '../voteThread/action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
  case 'RECEIVE_DETAIL_THREAD':
    return action.payload.detailThread;

  case 'CLEAR_DETAIL_THREAD':
    return null;

  case VoteCommentActionType.UPVOTE_COMMENT:
  case VoteCommentActionType.DOWNVOTE_COMMENT:
  case VoteCommentActionType.NEUTRALIZE_VOTE_COMMENT: {
    if (!detailThread) return detailThread;
    const { commentId, userId } = action.payload;

    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id !== commentId) return comment;

        const upVotes = new Set(comment.upVotesBy);
        const downVotes = new Set(comment.downVotesBy);

        if (action.type === VoteCommentActionType.UPVOTE_COMMENT) {
          upVotes.add(userId);
          downVotes.delete(userId);
        } else if (action.type === VoteCommentActionType.DOWNVOTE_COMMENT) {
          downVotes.add(userId);
          upVotes.delete(userId);
        } else if (action.type === VoteCommentActionType.NEUTRALIZE_VOTE_COMMENT) {
          upVotes.delete(userId);
          downVotes.delete(userId);
        }

        return {
          ...comment,
          upVotesBy: [...upVotes],
          downVotesBy: [...downVotes],
        };
      }),
    };
  }

  case VoteThreadActionType.UPVOTE_THREAD:
  case VoteThreadActionType.DOWNVOTE_THREAD:
  case VoteThreadActionType.NEUTRALIZE_VOTE_THREAD: {
    if (!detailThread) return detailThread;
    const { userId } = action.payload;

    const upVotes = new Set(detailThread.upVotesBy);
    const downVotes = new Set(detailThread.downVotesBy);

    if (action.type === VoteThreadActionType.UPVOTE_THREAD) {
      upVotes.add(userId);
      downVotes.delete(userId);
    } else if (action.type === VoteThreadActionType.DOWNVOTE_THREAD) {
      downVotes.add(userId);
      upVotes.delete(userId);
    } else if (action.type === VoteThreadActionType.NEUTRALIZE_VOTE_THREAD) {
      upVotes.delete(userId);
      downVotes.delete(userId);
    }

    return {
      ...detailThread,
      upVotesBy: [...upVotes],
      downVotesBy: [...downVotes],
    };
  }

  default:
    return detailThread;
  }
}

export { detailThreadReducer };