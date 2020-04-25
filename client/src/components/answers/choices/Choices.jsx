import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { shuffle } from '../../../utils';
import Option from '../option';

import './index.css';

const Choices = ({
  answer, incorrectAnswers, isRevealed,
}) => {
  const [shuffledChoices, setShuffledChoices] = useState([]);

  useEffect(() => {
    const choices = [
      { isCorrect: true, label: answer },
      ...incorrectAnswers.map((label) => ({ isCorrect: false, label })),
    ];

    setShuffledChoices(shuffle(choices));
  }, [answer, incorrectAnswers]);

  const options = (shuffledChoices.map(({ isCorrect, label }) => (
    <Option label={label} isRevealed={isRevealed} isCorrect={isCorrect} key={label} />
  )));

  return (
    <div className="Container">
      {options}
    </div>
  );
};

Choices.propTypes = {
  answer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  isRevealed: PropTypes.bool.isRequired,
};

const isValidChoices = () => true;

export { isValidChoices, Choices };
