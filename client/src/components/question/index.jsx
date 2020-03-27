import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import ColorThief from 'colorthief';

import { getQuestion } from '../../utils/apiRequests';

import Choices from '../choices';
import { Alphabet, isValidAlphabet } from '../alphabet';

import './index.css';

export default function Question({
  track, setColour, shiftQuestion, textColour,
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
    const { answer, incorrectAnswers, message } = question;
    let answers;
    // if (isValidAlphabet({ answer })) {
    //   answers = <Alphabet isRevealed={stage === 1} answer={answer} incorrectAnswers={incorrectAnswers} textColour={textColour} />;
    // } else {
    //   answers = <Choices isRevealed={stage === 1} answer={answer} incorrectAnswers={incorrectAnswers} textColour={textColour} />;
    // }
    answers = <Choices isRevealed={stage === 1} answer={answer} incorrectAnswers={incorrectAnswers} textColour={textColour} />;
  
    content = (
      <div className="question">
        <h1 style={{ 'font-size': '5vw', color: textColour }}>{question.message}</h1>
        <img onLoad={handleImageLoaded} crossOrigin="anonymous" ref={refContainer} src={question.imgUrl} className="Record" alt="albumImage" />
        {answers}
        <ReactPlayer url={question.previewUrl} playing />
      </div>
    );
  }

  return (
    <div style={{'outline':'0'}} role="button" tabIndex={0} onKeyPress={() => handleClick()} onClick={() => handleClick()}>
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
  textColour: PropTypes.arrayOf(PropTypes.number).isRequired,
};
