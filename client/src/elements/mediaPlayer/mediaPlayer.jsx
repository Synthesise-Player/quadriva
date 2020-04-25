import { useEffect } from 'react';

const audio = new Audio();
let played = false;

export default ({ url, setPlayFunction }) => {
  useEffect(() => {
    if (url) {
      audio.src = url;
      if (played) audio.play();
    }
  }, [url]);

  useEffect(() => setPlayFunction(() => () => {
    audio.play();
    played = true;
  }), [setPlayFunction]);

  return null;
};
