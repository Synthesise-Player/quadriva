import axios from 'axios';
import config from '../config';

const { origin } = config;

const search = async (query) => axios.get(`${origin}/api/v1/search?q=${query}`);

const getTracks = async (id) => axios.get(`${origin}/api/v1/playlists/${id}/tracks`);

const getQuestion = async (track) => axios.post(`${origin}/api/v1/questions`, track);

export {
  search,
  getTracks,
  getQuestion,
};
