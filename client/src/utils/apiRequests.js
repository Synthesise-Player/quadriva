import axios from 'axios';
import config from '../config';

const { origin } = config;

const search = (query) => axios.get(`${origin}/search?q=${query}`);

const getTracks = (id) => axios.get(`${origin}/playlists/${id}/tracks`);

const getQuestion = (track) => axios.post(`${origin}/questions`, track);

const getPlaylist = (id) => axios.get(`${origin}/playlists/${id}`);

const getPopularPlaylists = async () => [
  {
    id: '7M8tFRlEN77q7Jo27Z6noc',
    name: 'The Strokes: The New Abnormal',
    images: [{ url: 'https://i.scdn.co/image/ab67706c0000da84e5892d08f3f66497a2fd2928' }],
    owner: { display_name: 'theofficialstrokes' },
  },
  {
    id: '37i9dQZF1DX1A0PcRHdJVf',
    name: 'This Is Arctic Monkeys',
    images: [{ url: 'https://i.scdn.co/image/ab67706f00000002001c876bafaee2aa86b1c770' }],
    owner: { display_name: 'Spotify' },
  },
  {
    id: '66dEoijmnalr4wBN3jcUtk',
    name: 'Epochal',
    images: [{ url: 'https://mosaic.scdn.co/640/ab67616d0000b2730444a7b9f9206656f4fc5b3fab67616d0000b273571269d36f8936b86937b7f4ab67616d0000b273badd22927f22334c2aa480a0ab67616d0000b273e0d32637bc9bcc795702bd6d' }],
    owner: { display_name: 'Craig Forrest' },
  },
];
const getRecentPlaylists = async () => [
  {
    id: '37i9dQZF1DZ06evO3HN9FC',
    name: 'This Is Circa Waves',
    images: [{ url: 'https://thisis-images.scdn.co/37i9dQZF1DZ06evO3HN9FC-default.jpg' }],
    owner: { display_name: 'Spotify' },
  },
  {
    id: '2sVf1izQtdcWa4QUlYtKGe',
    name: 'Declan McKenna Complete',
    images: [{ url: 'https://i.scdn.co/image/ab67706c0000da84ecfa92029f389f42c283a38a' }],
    owner: { display_name: 'Declan McKenna' },
  },
  {
    id: '46Niw27qaSgi15Azvuj3kP',
    name: 'Guess that Tune 2.0',
    images: [{ url: 'https://mosaic.scdn.co/640/ab67616d0000b27368379c03e56f4ba08e92446cab67616d0000b273797c32cf49a5b3e2707e9efcab67616d0000b27389bc5819382ffda1b450a0fbab67616d0000b27392f27b0c3dcdcd1cd8c4f4b8' }],
    owner: { display_name: 'Eric Arand Eisenbise' },
  },
];

export {
  search,
  getTracks,
  getQuestion,
  getPlaylist,
  getPopularPlaylists,
  getRecentPlaylists,
};
