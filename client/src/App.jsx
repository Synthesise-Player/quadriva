import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import Question from './components/question';
import { getTracks } from './utils/apiRequests';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { playlist: false };
  }

  setPlaylist(id) {
    getTracks(id).then(({ data }) => {
      this.setState({ tracks: data });
    });
  }

  render() {
    const { tracks } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Quadrivia</h1>
          {!tracks ? <img src={logo} className="App-logo" alt="logo" /> : null}
          {!tracks ? <Search setPlaylist={this.setPlaylist.bind(this)}/> : null}
          {tracks ? <Question tracks={tracks} /> : null}
        </header>
      </div>
    );
  }
}
