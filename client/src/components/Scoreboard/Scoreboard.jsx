import React from 'react';

import {
  ScoreboardWrapper, Chunk,
} from './Scoreboard.module.scss';

const Scoreboard = ({ numberOfChunks, revealedChunks }) => {
  const chunks = Array.from(Array(Math.max(numberOfChunks - revealedChunks, 0)));
  return (
    <div className={ScoreboardWrapper}>
      {chunks.map(() => <div style={{ width: `${100 / numberOfChunks}%` }} className={Chunk} />)}
    </div>
  );
};

export default Scoreboard;
