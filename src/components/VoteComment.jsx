import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { BiDislike, BiSolidDislike } from 'react-icons/bi';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
} from '../states/voteComment/action';

function VoteComment({ threadId, commentId }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const voteCommentStatus = useSelector((state) => state.voteComment[commentId]);

  const userId = authUser?.id;

  const upVotesCount = voteCommentStatus?.upVotesBy?.length || 0;
  const downVotesCount = voteCommentStatus?.downVotesBy?.length || 0;

  const upVoted = voteCommentStatus?.upVotesBy?.includes(userId);
  const downVoted = voteCommentStatus?.downVotesBy?.includes(userId);

  const handleUpVote = () => {
    dispatch(asyncUpVoteComment(threadId, commentId));
  };

  const handleDownVote = () => {
    dispatch(asyncDownVoteComment(threadId, commentId));
  };

  return (
    <div className='vote-comment'>
      <div>
        <button onClick={handleUpVote}>
          {upVoted ? <BiSolidLike /> : <BiLike />}
        </button>
        <label>{upVotesCount}</label>
        <button onClick={handleDownVote}>
          {downVoted ? <BiSolidDislike /> : <BiDislike />}
        </button>
        <label>{downVotesCount}</label>
      </div>
    </div>
  );
}

VoteComment.propTypes = {
  threadId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};

export { VoteComment };