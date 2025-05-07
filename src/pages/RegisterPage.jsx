import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterInput } from '../components/RegisterInput';
import { asyncRegisterNewUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterNewUser({ name, email, password }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='auth-page-container'>
      <section className='auth-page-wrapper'>
        <header className='app-title'>
          <h2>Forum Diskusi</h2>
          <h3>Dicoding</h3>
        </header>
        <div className='auth-form'>
          <RegisterInput register={onRegister} />
        </div>
      </section>
    </div>
  );
}

export { RegisterPage };