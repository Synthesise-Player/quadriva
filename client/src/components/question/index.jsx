import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import ColorThief from 'colorthief';

import { getQuestion } from '../../utils/apiRequests';
import { shuffle } from '../../utils';

import './index.css';


const getMusic = (id) => <ReactPlayer url={id} playing />;
let colour;
export default function Question({ track, setColour, shiftQuestion }) {
  // console.log('render Question')
  const [stage, setStage] = useState(0);
  const [question, setQuestion] = useState({ question: undefined, options: [] });

  const refContainer = useRef(null);

  const colorThief = new ColorThief();

  const handleImageLoaded = () => {
    const img = refContainer.current;

    img.addEventListener('load', () => {
      const domColour = colorThief.getColor(img, 100);
      if (colour !== domColour) {
        setColour(domColour.toString());
        colour = domColour;
      }
    });
  };

  useEffect(() => {
    if (track) {
      const fetchData = async () => {
        const { data } = await getQuestion(track);
        const { answer, incorrectAnswers } = data;
        const options = shuffle([
          { hidden: <p>{answer}</p>, revealed: <p className="text-success">{answer}</p> },
          ...incorrectAnswers.map((option) => ({ hidden: <p>{option}</p>, revealed: <p className="text-danger">{option}</p> })),
        ]);
        setQuestion({ question: data, options });
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
  let q;

  const optionTags = question.options.map((option) => (
    <div className="col-sm">
      {stage === 0 ? option.hidden : option.revealed}
    </div>
  ));

  if (question.question) {
    const answers = (
      <div className="container">
        <div className="row">
          {optionTags[0]}
          {optionTags[1]}
        </div>
        <div className="row">
          {optionTags[2]}
          {optionTags[3]}
        </div>
      </div>
    );
    q = (
      <div>
        <h1>{question.question.message}</h1>
        <img onLoad={handleImageLoaded} crossOrigin="anonymous" ref={refContainer} src={question.question.imgUrl} className="Record" alt="albumImage" />
        {answers}
        {getMusic(question.question.previewUrl)}
      </div>
    );
  }

  return (
    <div role="button" tabIndex={0} onKeyPress={() => handleClick()} onClick={() => handleClick()}>
      {q}
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
};
