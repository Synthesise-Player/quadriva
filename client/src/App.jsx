import React from 'react';

import logo from './logo.svg';
import './App.css';
import Search from './components/search/Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quadrivia</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Search />
      </header>
    </div>
  );
}

export default App;
