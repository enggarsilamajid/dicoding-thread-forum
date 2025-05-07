import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils/index';
import { VoteComment } from './VoteComment';

function Comments({ threadId, comment }) {
  const { id: commentId, owner, content, createdAt } = comment;

  return (
    <section className='comment-inner'>
      <div className='comment-header'>
        <div className='comment-header-avatar'>
          <img src={owner.avatar} alt={owner.name} />
        </div>
        <div className='comment-header-caption'>
          <p className='comment-author'>{owner.name}</p>
          <p className='comment-posted'>- {postedAt(createdAt)}</p>
        </div>
      </div>
      <article dangerouslySetInnerHTML={{ __html: content }} />
      <VoteComment threadId={threadId} commentId={commentId} />
    </section>
  );
}

const ownerShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentShape = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

Comments.propTypes = {
  threadId: PropTypes.string.isRequired,
  comment: PropTypes.shape(commentShape).isRequired,
};

export { Comments, commentShape };