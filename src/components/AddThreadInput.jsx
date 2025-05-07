import React from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../hooks/useInput';

function AddThreadInput({ addThread }) {
  const [title, onTitleChange, resetTitle] = useInput('');
  const [body, onBodyChange, resetBody] = useInput('');
  const [category, onCategoryChange, resetCategory] = useInput('');

  return (
    <div className='add-thread-input-wrapper'>
      <h2>Mulai Diskusi Baru:</h2>
      <input
        className='add-thread-input-title'
        type='text'
        placeholder='Judul Diskusi'
        value={title}
        onChange={onTitleChange}
        required
      />
      <div className='add-thread-input-body-wrapper'>
        <textarea
          className='add-thread-input-body'
          type='text'
          placeholder='Tulis isi diskusi di sini ...'
          value={body}
          onChange={(e) => onBodyChange(e.target.value.length <= 400 ? e : null)}
          required
        />
        <div>
          <p>
            {body.length}/400
          </p>
        </div>
      </div>
      <input
        className='add-thread-input-category'
        type='text'
        placeholder='Kategori (opsional)'
        value={category}
        onChange={onCategoryChange}
      />
      <button
        type='button'
        onClick={() => {
          addThread({ title, body, category });
          resetTitle();
          resetBody();
          resetCategory();
        }}
      >Bagikan</button>
    </div>
  );
}

AddThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export { AddThreadInput };