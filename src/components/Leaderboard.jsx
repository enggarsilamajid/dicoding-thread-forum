import React from 'react';
import { Navigation } from './Navigation';

const getRankIcon = (rank) => {
  switch (rank) {
    case 0:
      return '🥇';
    case 1:
      return '🥈';
    case 2:
      return '🥉';
    default:
      return '';
  }
};

function Leaderboard ({ leaderboard }) {
  const top3 = leaderboard.slice(0, 3);

  return (
    <>
      <div className='leaderboard-list'>
        <h2>Leaderboard</h2>
        <ol>
          {leaderboard.map((user, index) => (
            <li key={user.userId} style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <span style={{ marginLeft: '10px' }}>#{index + 1}. </span>
                <span style={{ marginLeft: '10px' }}>
                  <strong>{user.name}</strong> - {user.totalScore} pts
                </span>
              </div>
              <div className='leaderboard-list-icon-avatar'>
                <span className='rank-icon'>{getRankIcon(index)}</span>
                <img src={user.avatar} alt={user.name} width={40} height={40} style={{ marginLeft: '10px' }} />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className='split-to-right'>
        <div>
          <h2>Top 3</h2>
          <ol>
            {top3.map((user, index) => (
              <li key={user.userId}>
                {getRankIcon(index)} <strong>{user.name}</strong> ({user.totalScore} pts)
              </li>
            ))}
          </ol>
        </div>
        <Navigation />
      </div>
    </>
  );
};

export { Leaderboard };