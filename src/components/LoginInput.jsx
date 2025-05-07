import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useInput } from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form>
      <h3>Masuk</h3>
      <div>
        <input type='text' value={email} onChange={onEmailChange} placeholder='Email' />
        <input type='password' value={password} onChange={onPasswordChange} placeholder='Kata Sandi' />
        <button type='button' onClick={() => login({ email, password })}>Kirim</button>
      </div>
      <p>
        Belum punya akun?
        {' '}
        <Link to='/register'>Daftar</Link>
      </p>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export { LoginInput };