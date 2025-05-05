import React from 'react';
import './TeamCell.css';

const teamColors = {
  Design: '#e0c4ff',
  Product: '#b8e0ff',
  Marketing: '#ffd6d6',
  Engineering: '#c8ffd9',
  Tech: '#ffe7b2',
  Sales: '#f5c6aa',
  Data: '#c0e0ff',
};

const TeamCell = ({ teams }) => {
  const displayTeams = teams.slice(0, 3);
  const remainingCount = teams.length - displayTeams.length;

  return (
    <div className="team-cell">
      {displayTeams.map((team, index) => (
        <span
          key={index}
          className="team-badge"
          style={{ backgroundColor: teamColors[team] || '#eee' }}
        >
          {team}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="team-badge extra">+{remainingCount}</span>
      )}
    </div>
  );
};

export default TeamCell;
