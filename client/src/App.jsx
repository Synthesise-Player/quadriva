import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import logo from './logo.svg';
import './App.css';
import { Search, Question } from './components';
import { getTracks } from './utils/apiRequests';
import { shuffle } from './utils';

const calculateTextColour = ([r, g, b]) => {
  const o = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
  return (o > 125) ? 'black' : 'white';
};

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
    <div style={{ 'background': `rgb(${colour.toString()}) url(connected.png)` }} className="App">
      <header className="App-header">
        <h1 style={{ 'font-size': '5vw', color: calculateTextColour(colour) }}>Quadrivia</h1>
        {!tracks ? <img src={logo} className="App-logo" alt="logo" /> : null}
        {!tracks ? <Search setPlaylist={setPlaylist} /> : null}
        {tracks && tracks.length > 0 ? <Question style={{'outline':'0'}} textColour={calculateTextColour(colour)} setColour={setColour} shiftQuestion={() => foo()} track={tracks[0]} /> : null}
      </header>
    </div>
  );
};
