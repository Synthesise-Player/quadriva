import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

import { getQuestion } from '../../utils/apiRequests';
import { shuffle } from '../../utils';

import './index.css';

const getMusic = (id) => <ReactPlayer url={id} playing />;

export default function Question({ tracks: t }) {
  const tracks = shuffle(t);
  const [stage, setStage] = useState(0);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      const fetchData = async () => {
        const { data } = await getQuestion(tracks[0]);
        setQuestion(data);
        const { answer, incorrectAnswers } = data;
        setOptions(shuffle([
          { hidden: <p>{answer}</p>, revealed: <p className="text-success">{answer}</p> },
          ...incorrectAnswers.map((option) => ({ hidden: <p>{option}</p>, revealed: <p className="text-danger">{option}</p> })),
        ]));
      };
      fetchData();
    }
  }, [tracks]);

  if (stage === 2) return <Question tracks={tracks.slice(1, tracks.length)} />;

  let q;

  const optionTags = options.map((option) => (
    <div className="col-sm">
      {stage === 0 ? option.hidden : option.revealed}
    </div>
  ));

  if (question) {
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
        <h1>{question.message}</h1>
        <img src={question.imgUrl} className="Record" alt="albumImage" />
        {answers}
        {getMusic(question.previewUrl)}
      </div>
    );
  }

  return (
    <div role="button" tabIndex={0} onKeyPress={() => setStage(stage + 1)} onClick={() => setStage(stage + 1)}>
      {q}
    </div>
  );
}

Question.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
