import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { shuffle } from '../../utils';

import './index.css';

export default function Choices({
  answer, incorrectAnswers, textColour, isRevealed,
}) {
  const [options, setOptions] = useState([{}, {}, {}, {}]);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const shuffledOptions = shuffle([
      { value: answer,  revealed: <p className="text-success">{answer}</p> },
      ...incorrectAnswers.map((option) => ({ value: option, revealed: <p className="text-danger">{option}</p> })),
    ]);
    setOptions(shuffledOptions);
  }, [answer, ...incorrectAnswers]);

  useEffect(() => {
    setChoices(options.map((option) => ({...option, hidden: <p style={{ color: textColour }}>{option.value}</p>})));
  }, [textColour, ...options]);

  return (
    <div className="container">
      <div className="row">
        {choices.map((option) => <div className="col-sm-6">{isRevealed ? option.revealed : option.hidden}</div>)}
      </div>
    </div>
  );
}

Choices.propTypes = {
  answer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  textColour: PropTypes.string.isRequired,
  isRevealed: PropTypes.bool.isRequired,
};
