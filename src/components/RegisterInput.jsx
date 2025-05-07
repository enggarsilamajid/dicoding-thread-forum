import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useInput } from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form>
      <h3>Daftar</h3>
      <div>
        <input type='text' value={name} onChange={onNameChange} placeholder='Nama Pengguna' />
        <input type='email' value={email} onChange={onEmailChange} placeholder='Email' />
        <input type='password' value={password} onChange={onPasswordChange} placeholder='Kata Sandi' />
        <button type='button' onClick={() => register({ name, email, password })}>Kirim</button>
      </div>
      <p>
        Sudah punya akun?
        {' '}
        <Link to='/'>Masuk</Link>
      </p>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export { RegisterInput };