import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.css';

import Game from '../Game';
import Home from '../Home';
import Search from '../SearchPlaylists';

import './App.css';

export default () => (
  <div>
    <Helmet>
      <html lang="en" />
      <title itemProp="name" lang="en">Quadrivia: music quiz for Spotify</title>
      <meta name="description" content="Test your knowledge on your favourite Spotify playlists" />
    </Helmet>
    <Router>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/play/:playlistId">
          <Game />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </div>
);
