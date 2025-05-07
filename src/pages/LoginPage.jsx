import React from 'react';
import { useDispatch } from 'react-redux';
import { LoginInput } from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className='auth-page-container'>
      <section className='auth-page-wrapper'>
        <header className='app-title'>
          <h2>Forum Diskusi</h2>
          <h3>Dicoding</h3>
        </header>
        <div className='auth-form'>
          <LoginInput login={onLogin} />
        </div>
      </section>
    </div>
  );
}

export { LoginPage };