import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import logo from './logo.svg';
import './App.css';
import { Search, Question } from './components';
import { getTracks } from './utils/apiRequests';
import { shuffle } from './utils';

export default () => {
  const [tracks, setTracks] = useState();
  const [colour, setColour] = useState([40, 44, 52]);

  const setPlaylist = async (id) => {
    const { data } = await getTracks(id);
    setTracks(shuffle(data));
  };

  const foo = () => {
    if (tracks.length === 1) {
      setTracks(null);
    } else {
      setTracks(tracks.splice(1));
    }
    // setColour(colour);
  };

  return (
    <div style={{ background: `rgb(${colour.toString()})` }} className="App">
      <header className="App-header">
        <h1>Quadrivia</h1>
        {!tracks ? <img src={logo} className="App-logo" alt="logo" /> : null}
        {!tracks ? <Search setPlaylist={setPlaylist} /> : null}
        {tracks && tracks.length > 0 ? <Question backgroundColour={colour} setColour={setColour} shiftQuestion={() => foo()} track={tracks[0]} /> : null}
      </header>
    </div>
  );
};
