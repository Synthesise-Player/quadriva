import React, { useState, useEffect } from 'react';

import { search, getPopularPlaylists, getRecentPlaylists } from '../../utils/apiRequests';

import SearchBar from '../../components/searchBar/SearchBar';
import Playlist from '../../components/Playlist';

import { SearchWrapper, QuickPlaylists, SearchW } from './SearchPlaylists.module.css';
import './Game.css';

let query = '';

const Search = () => {
  const [playlists, setPlaylists] = useState([]);
  const [popularPlaylists, setPopularPlaylists] = useState([]);
  const [recentPlaylists, setRecentPlaylists] = useState([]);

  useEffect(() => {
    getPopularPlaylists().then((p) => setPopularPlaylists(p));
    getRecentPlaylists().then((p) => setRecentPlaylists(p));
  }, []);

  const handleSearchChange = (e) => { query = e.target.value; };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (query !== '') {
      const { data } = await search(query);
      setPlaylists(data.playlists.items);
    } else {
      setPlaylists([]);
    }
  };

  // const handlePlaylistClick = async (id) => {
  //   const worked = await setPlaylist(id);
  //   if (!worked)
  //   alert('Sorry we can not currently play any songs from
  //  this playlist :(\nThere are no Spotify previews
  //  in this playlist which we can play without you logging in\nThe ability
  //  to log in to unlock more playlists is in the backlog!');
  //   if (worked) playFunction();
  // };

  const popularPlaylistsDiv = popularPlaylists.map(({
    id, name, owner, images,
  }) => (
    <Playlist
      id={id}
      name={name}
      owner={owner.display_name}
      imgUrl={images[images.length - 1].url}
      handleClick={() => { window.location.href = `play/${id}`; }}
    />
  ));

  const recentPlaylistsDiv = recentPlaylists.map(({
    id, name, owner, images,
  }) => (
    <Playlist
      id={id}
      name={name}
      owner={owner.display_name}
      imgUrl={images[0].url}
      handleClick={() => { window.location.href = `play/${id}`; }}
    />
  ));

  return (
    <div className="App">
      <header className="App-header">
        <div className={SearchWrapper}>
          <div className={SearchW}>
            <SearchBar handleChange={handleSearchChange} handleSubmit={handleSearch} />
          </div>
          {playlists.map(({
            id, name, owner, images,
          }) => (
            <Playlist
              id={id}
              name={name}
              owner={owner.display_name}
              imgUrl={images[0].url}
              handleClick={() => { window.location.href = `play/${id}`; }}
            />
          ))}
          {playlists.length === 0 ? (
            <div className={QuickPlaylists}>
              Popular playlists
              {popularPlaylistsDiv}
              Recently played playlists
              {recentPlaylistsDiv}
            </div>
          ) : null}
        </div>
      </header>
    </div>
  );
};

export default Search;
