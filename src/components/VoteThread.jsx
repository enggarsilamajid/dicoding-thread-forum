import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { BiDislike, BiSolidDislike } from 'react-icons/bi';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
} from '../states/voteThread/action';

function VoteThread({ threadId }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const detailThread = useSelector((state) => state.detailThread);
  const threadVote = useSelector((state) => state.voteThread[threadId]);

  const upVoted = threadVote?.upVotesBy?.includes(authUser.id);
  const downVoted = threadVote?.downVotesBy?.includes(authUser.id);

  const upVotesCount = detailThread?.upVotesBy?.length || 0;
  const downVotesCount = detailThread?.downVotesBy?.length || 0;

  const handleUpVote = () => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const handleDownVote = () => {
    dispatch(asyncDownVoteThread(threadId));
  };

  return (
    <div className='vote-thread'>
      <div>
        <button onClick={handleUpVote}>
          {upVoted ? <BiSolidLike /> : <BiLike />}
        </button>
        <label>{upVotesCount}</label>
      </div>
      <div>
        <button onClick={handleDownVote}>
          {downVoted ? <BiSolidDislike /> : <BiDislike />}
        </button>
        <label>{downVotesCount}</label>
      </div>
    </div>
  );
}

VoteThread.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export { VoteThread };