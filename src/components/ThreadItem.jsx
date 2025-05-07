import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils/index';

function ThreadItem({
  id, title, body, createdAt, user, commentCount,
}) {
  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  return (
    <section onClick={onThreadClick} className='thread-item-wrapper'>
      <div className='thread-item-content'>
        <header>
          <div className='avatar-wrapper'>
            <img src={user.avatar} alt={user.name} className='thread-item-avatar' />
          </div>
          <div className='header-caption-wrapper'>
            <h3 className='thread-item-title'>{title}</h3>
            <div>
              <p className='thread-item-user'>{user.name}</p>
              <p className='thread-item-posted'>- {postedAt(createdAt)}</p>
            </div>
          </div>
        </header>
        <article dangerouslySetInnerHTML={{ __html: body }} />
        <div className='thread-item-info-wrapper'>
          <p className='thread-item-comment-count'>
            {commentCount} Komentar
          </p>
        </div>
      </div>
    </section>
  );
}

const userShape = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

export { threadItemShape, ThreadItem };