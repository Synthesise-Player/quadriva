import React from 'react';

import {
  ScoreboardWrapper, Chunk,
} from './Scoreboard.module.scss';

const backgroundColours = [
  'linear-gradient(109.6deg, rgba(232, 252, 252, 1) 11.2%, rgba(252, 215, 134, 1) 56.2%, rgba(247, 124, 124, 1) 100.2%)',
  'linear-gradient(109.6deg, rgba(252, 176, 69, 1) 11.2%, rgba(253, 29, 29, 1) 55.2%, rgba(33, 25, 180, 1) 91.1%)',
];

const Scoreboard = ({ numberOfChunks, revealedChunks }) => {
  const hiddenChunks = numberOfChunks - (revealedChunks % (numberOfChunks + 1));
  const level = Math.floor(revealedChunks / (numberOfChunks + 1));
  return (
    <div className={ScoreboardWrapper} style={{ 'background-image': backgroundColours[level % backgroundColours.length] }}>
      <div style={{ width: `${(100 * hiddenChunks) / numberOfChunks}%` }} className={Chunk} />
    </div>
  );
};

export default Scoreboard;
