import React from 'react';

import { search } from '../../utils/apiRequests';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = { playlists: [] };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { query } = this.state;
    if (query !== '') {
      const response = await search(query);
      this.setState({
        playlists: response.data.playlists.items.map((playlist) => ({
          name: playlist.name,
          id: playlist.id,
          imgUrl: playlist.images[0].url,
        })),
      });
    }
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  }

  render() {
    let playlists;
    if (this.state) {
      playlists = this.state.playlists.map(({ name, id, imgUrl }) => (
        <div role="button" tabIndex={0} onClick={() => alert(id)} onKeyPress={() => alert(id)}>
          <h1>{name}</h1>
          <img src={imgUrl} alt={id} />
        </div>
      ));
    }

    return (
      <div>
        <form className="example">
          <input type="text" onChange={this.handleChange} placeholder="Search.." name="search" />
          <button type="submit" onClick={this.handleSubmit}>Search</button>
        </form>
        {playlists}
      </div>
    );
  }
}
