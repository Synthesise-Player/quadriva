import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import ColorThief from 'colorthief';

import { getQuestion } from '../../utils/apiRequests';

import Choices from '../choices';

import './index.css';

const calculateTextColour = ([r, g, b]) => {
  const o = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
  return (o > 125) ? 'black' : 'white';
};

const getMusic = (id) => <ReactPlayer url={id} playing />;

export default function Question({
  track, setColour, shiftQuestion, backgroundColour,
}) {
  const [stage, setStage] = useState(0);
  const [question, setQuestion] = useState();

  const refContainer = useRef(null);

  const handleImageLoaded = () => {
    const colorThief = new ColorThief();
    const img = refContainer.current;
    setColour(colorThief.getColor(img, 10));
  };

  useEffect(() => {
    if (track) {
      const fetchData = async () => {
        const { data } = await getQuestion(track);
        setQuestion(data);
      };
      fetchData();
    }
  }, [track]);

  const handleClick = () => {
    if (stage === 0) {
      setStage(stage + 1);
    } else {
      setStage(0);
      shiftQuestion();
    }
  };

  let content;

  if (question) {
    const { answer, incorrectAnswers } = question;
    const textColour = calculateTextColour(backgroundColour);
    const answers = <Choices isRevealed={stage === 1} answer={answer} incorrectAnswers={incorrectAnswers} textColour={textColour} />;
    content = (
      <div>
        <h1 style={{ color: textColour }}> {question.message}</h1>
        <img onLoad={handleImageLoaded} crossOrigin="anonymous" ref={refContainer} src={question.imgUrl} className="Record" alt="albumImage" />
        {answers}
        {getMusic(question.previewUrl)}
      </div>
    );
  }

  return (
    <div role="button" tabIndex={0} onKeyPress={() => handleClick()} onClick={() => handleClick()}>
      {content}
    </div>
  );
}

Question.propTypes = {
  track: PropTypes.shape({
    album: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    artists: PropTypes.array.isRequired,
    preview_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setColour: PropTypes.func.isRequired,
  shiftQuestion: PropTypes.func.isRequired,
  backgroundColour: PropTypes.arrayOf(PropTypes.number).isRequired,
};
