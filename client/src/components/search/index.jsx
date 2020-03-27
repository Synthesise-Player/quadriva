import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { search } from '../../utils/apiRequests';

import './index.css';

const Search = ({ setPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);
  let query = '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query !== '') {
      const { data } = await search(query);
      setPlaylists(data.playlists.items.map(({ name, id, images }) => ({
        name, id, imgUrl: images[0].url,
      })));
    }
  };

  const handleChange = (e) => {
    console.log(e.target);
    query = e.target.value;
  }

  const playlistsDiv = playlists.map(({ name, id, imgUrl }) => (
    <div style={{'outline':'0'}} role="button" tabIndex={0} onClick={() => setPlaylist(id)} onKeyPress={() => setPlaylist(id)}>
      <h1>{name}</h1>
      <img src={imgUrl} alt={name} />
    </div>
  ));

  return (
    <div>
      <form className="example">
        <input type="text" onChange={handleChange} placeholder="Search.." name="search" />
        <button type="submit" onTouchStart={handleSubmit} onClick={handleSubmit}>Search</button>
      </form>
      {playlistsDiv}
    </div>
  );
};

Search.propTypes = {
  setPlaylist: PropTypes.func.isRequired,
};

export default Search;
