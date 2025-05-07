import React from 'react';
import PropTypes from 'prop-types';
import { ThreadItem, threadItemShape } from './ThreadItem';
import { commentShape } from './Comments';

function ThreadsList({ threads, comments }) {
  const commentCountMap = comments.reduce((acc, comment) => {
    acc[comment.threadId] = (acc[comment.threadId] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className='thread-list'>
      {threads.map((thread) => {
        const commentCount = commentCountMap[thread.id] || 0;

        return (
          <ThreadItem
            key={thread.id}
            {...thread}
            commentCount={commentCount}
          />
        );
      })}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
};

export { ThreadsList };