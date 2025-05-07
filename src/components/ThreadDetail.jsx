import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils/index';
import { VoteThread } from './VoteThread';

function ThreadDetail({
  threadId, title, body, createdAt, owner,
}) {
  return (
    <section className='thread-detail'>
      <header>
        <div className='thread-detail-avatar'>
          <img src={owner.avatar} alt={owner.name} />
        </div>
        <div className='thread-detail-header-caption'>
          <h3>{title}</h3>
          <div>
            <p>{owner.name}</p>
            <p>- {postedAt(createdAt)}</p>
          </div>
        </div>
      </header>
      <article dangerouslySetInnerHTML={{ __html: body }} />
      <div className='thread-votes'>
        <VoteThread threadId={threadId} />
      </div>
    </section>
  );
}

const ownerShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
};

export { ThreadDetail };