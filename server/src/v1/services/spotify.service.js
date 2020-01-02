const rp = require('request-promise');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

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
    uri: `https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks.items.track(id%2Calbum(release_date%2Cimages)%2Cpreview_url%2Cname%2Cartists.id)`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenId}`,
    },
    json: true,
  };
  return rp(options);
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

module.exports = {
  search,
  getPlaylistTracks,
  getRecommendations,
};
