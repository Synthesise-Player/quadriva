import React, { useEffect, useState } from 'react';
import Button from '../../../elements/ButtonWhite';

import { Question as CQuestion } from './Setup.module.scss';
import Playlist from '../../../components/Playlist';

import { getPlaylist } from '../../../utils/apiRequests';

const Setup = ({ completeSetup, playlistId, bestStreak }) => {
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    getPlaylist(playlistId).then(({ data }) => {
      setPlaylist(data);
    });
  }, [playlistId]);
  console.log(playlist);

  return (
    <div className={CQuestion}>
      { playlist
        ? (
          <Playlist
            id={playlistId}
            name={playlist.name}
            owner={playlist.owner.display_name}
            imgUrl={playlist.images[0].url}
          />
        )
        : null }
      {bestStreak > 0 ? `Your longest streak was ${bestStreak}!` : null}
      <Button handleClick={completeSetup}>
        Click here to start
      </Button>
    </div>
  );
};

export default Setup;
