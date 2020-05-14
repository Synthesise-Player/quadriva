import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { shuffle } from '../../../utils';
import Option from '../option';

import './index.css';

const Choices = ({
  answer, incorrectAnswers, isRevealed, onClick,
}) => {
  const [shuffledChoices, setShuffledChoices] = useState([]);

  useEffect(() => {
    const incorrectChoices = incorrectAnswers.map((label) => ({ isCorrect: false, label }));
    const choices = [
      { isCorrect: true, label: answer },
      ...incorrectChoices,
    ];
    setShuffledChoices(shuffle(choices));
  }, [answer, incorrectAnswers]);

  const options = (shuffledChoices.map(({ isCorrect, label }) => (
    <Option
      onClick={() => onClick(label === answer)}
      label={label}
      isRevealed={isRevealed}
      isCorrect={isCorrect}
      key={label}
    />
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
  onClick: PropTypes.func.isRequired,
};

const isValidChoices = () => true;

export { isValidChoices, Choices };
