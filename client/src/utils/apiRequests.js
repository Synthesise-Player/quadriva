import axios from 'axios';
import config from '../config';

const { origin } = config;

const search = async (query) => axios.get(`${origin}/api/v1/search?q=${query}`);

export {
  search,
};
