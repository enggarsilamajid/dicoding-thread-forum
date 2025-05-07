import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveLeaderboard } from '../states/leaderboard/selectors';
import { asyncPopulateUsersAndThreadsAndComments } from '../states/shared/action';
import { Leaderboard } from '../components/Leaderboard';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboard = useSelector(receiveLeaderboard);
  const isDataReady = leaderboard.length > 0;

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreadsAndComments());
  }, [dispatch]);

  return (
    <section className='leaderboard-page'>
      {!isDataReady ? (
        <p>Loading leaderboard...</p>
      ) : (
        <Leaderboard leaderboard={leaderboard} />
      )}
    </section>
  );
}

export { LeaderboardPage };