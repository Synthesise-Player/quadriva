import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Record from '../../elements/Record';

import {
  PlaylistWrapper, Summary, Name, Owner, ImgContainer,
} from './Playlist.module.css';

const Playlist = ({
  handleClick, id, name, imgUrl, owner,
}) => (
  <div
    key={id}
    className={PlaylistWrapper}
    role="button"
    tabIndex={0}
    onClick={handleClick}
    onKeyPress={handleClick}
  >
    <div className={ImgContainer}>
      <img src={imgUrl} alt={`${name} - album artwork`} />
    </div>
    <div className={Summary}>
      <div className={Name}>{name}</div>
      <div className={Owner}>{`By ${owner}`}</div>
    </div>
  </div>
);

export default Playlist;
