import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import './Game.scss';
import Round from './Round';
import Setup from './Setup';
import { getTracks } from '../../utils/apiRequests';
import { shuffle } from '../../utils';

import MediaPlayer from '../../elements/mediaPlayer/mediaPlayer';

export default () => {
  const { playlistId } = useParams();
  const [tracks, setTracks] = useState([]);
  const [url, setUrl] = useState('');
  const [playFunction, setPlayFunction] = useState(() => () => console.log(1));

  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    getTracks(playlistId).then(({ data }) => {
      setTracks(shuffle(data));
    });
  }, [playlistId]);

  const shiftTracks = () => {
    if (tracks.length === 1) {
      setTracks([]);
    } else {
      setTracks(tracks.splice(1));
    }
  };

  const completeSetup = () => {
    playFunction();
    setSetupComplete(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Game">
          {!setupComplete || tracks.length === 0
            ? <Setup completeSetup={completeSetup} playlistId={playlistId} />
            : null}
          {setupComplete && tracks.length > 0
            ? <Round setUrl={setUrl} shiftQuestion={shiftTracks} track={tracks[0]} maxScore={12} />
            : null}
        </div>
      </header>
      <MediaPlayer setPlayFunction={setPlayFunction} url={url} />
    </div>
  );
};
