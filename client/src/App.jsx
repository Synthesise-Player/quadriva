import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import Question from './components/question';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { playlist: false };
  }

  setPlaylist(id) {
    this.setState({ playlist: id });
  }

  render() {
    const { playlist } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Quadrivia</h1>
          {!playlist ? <img src={logo} className="App-logo" alt="logo" /> : null}
          {!playlist ? <Search setPlaylist={this.setPlaylist.bind(this)}/> : null}
          {playlist ? <Question playlist={playlist} /> : null}
        </header>
      </div>
    );
  }
}
