const rp = require('request-promise');

const { spotifyCredentials: { clientId, clientSecret } } = require('../../config');

let token;

const validToken = () => token && token.expiration > new Date().getTime();

const updateToken = async () => {
  const buffer = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8');
  const options = {
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'client_credentials',
    },
    json: true,
    headers: {
      Authorization: `Basic ${buffer.toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const response = await rp(options);
  token = {
    id: response.access_token,
    expiration: new Date().getTime() + response.expires_in * 1000,
  };
};

const getTokenId = async () => {
  if (!validToken()) await updateToken();
  return token.id;
};

const search = async (q) => {
  const tokenId = await getTokenId();
  const options = {
    uri: `https://api.spotify.com/v1/search?q=${q}&type=playlist`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenId}`,
    },
    json: true,
  };
  return rp(options);
};

const getPlaylistTracks = async (playlistId) => {
  const tokenId = await getTokenId();
  const options = {
    uri: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items.track(album(release_date%2Cimages%2Cname)%2Cpreview_url%2Cname%2Cartists%2Cid)`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenId}`,
    },
    json: true,
  };
  const { items } = await rp(options);
  return items.filter(({ track }) => track.preview_url);
};

const getRecommendations = async (artistSeed, trackSeed) => {
  const tokenId = await getTokenId();
  const options = {
    uri: `https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artistSeed}&seed_tracks=${trackSeed}&min_energy=0.4&min_popularity=10`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenId}`,
    },
    json: true,
  };
  return rp(options);
};

const getRecommendedArtists = async (artistId) => {
  const tokenId = await getTokenId();
  const options = {
    uri: `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenId}`,
    },
    json: true,
  };
  return rp(options);
};

const getPlaylist = async (playlistId) => {
  const tokenId = await getTokenId();
  const options = {
    uri: `https://api.spotify.com/v1/playlists/${playlistId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenId}`,
    },
    json: true,
  };
  return rp(options);
};

module.exports = {
  search,
  getPlaylistTracks,
  getRecommendations,
  getRecommendedArtists,
  getPlaylist,
};
