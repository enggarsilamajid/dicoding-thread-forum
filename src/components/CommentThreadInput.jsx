import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../hooks/useInput';

function CommentThreadInput({ addComment, threadId = null }) {
  const [content, onContentChange, resetContent] = useInput();
  const [showInput, setShowInput] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowInput(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className='comment-input-wrapper'>
      {!showInput && (
        <input
          className='comment-input-trigger'
          type='text'
          placeholder='Bagikan pendapatmu dalam diskusi ini ...'
          onFocus={() => setShowInput(true)}
        />
      )}

      {showInput && (
        <div className='comment-input-show-hide'>
          <textarea
            className='comment-input-content'
            placeholder='Bagikan pendapatmu dalam diskusi ini ...'
            value={content}
            onChange={(e) =>
              onContentChange(e.target.value.length <= 260 ? e : null)
            }
          />
          <div>
            <p>{content.length}/260</p>
          </div>
          <button
            type='button'
            onClick={() => {
              addComment({ threadId, content });
              resetContent();
              setShowInput(false);
            }}
          >
            Kirim
          </button>
        </div>
      )}
    </div>
  );
}

CommentThreadInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
};

export { CommentThreadInput };