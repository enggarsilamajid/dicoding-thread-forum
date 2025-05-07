import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './components/Loading';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (authUser === null) {
    return (
      <div>
        <Loading />
        <main className='app-container'>
          <Routes>
            <Route path='/*' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Loading />
      <main className='app-container'>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/threads/:id' element={<DetailPage />} />
          <Route path='/leaderboard' element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export { App };