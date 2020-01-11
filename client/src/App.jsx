import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import logo from './logo.svg';
import './App.css';
import { Search, Question } from './components';
import { getTracks } from './utils/apiRequests';

export default () => {
  const [tracks, setTracks] = useState();

  const setPlaylist = async (id) => {
    const { data } = await getTracks(id);
    setTracks(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quadrivia</h1>
        {!tracks ? <img src={logo} className="App-logo" alt="logo" /> : null}
        {!tracks ? <Search setPlaylist={setPlaylist} /> : null}
        {tracks ? <Question tracks={tracks} /> : null}
      </header>
    </div>
  );
};
