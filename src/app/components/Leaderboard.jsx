// src/components/StaticLeaderboard.js
import React from 'react';

const StaticLeaderboard = () => {
  // Static leaderboard data
  const leaderboardData = [
    { id: 1, username: 'Sanjay', points: 22 },
    { id: 2, username: 'Srivishnu', points: 12 },
    { id: 3, username: 'Vasanth', points: 8 },
    { id: 4, username: 'Sita', points: 6 },
    { id: 5, username: 'Dharma', points: 2 },
  ];

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaticLeaderboard;
