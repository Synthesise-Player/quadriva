import React from 'react';
import PropTypes from 'prop-types';

import Option from '../option';
import './index.css';

const getCorrectCharacter = (answer) => {
  const suffix = answer
    .toUpperCase()
    .replace(/(?:(the|a|an) +)/gi, '')
    .trim();
  return suffix.charAt(0);
};

const isValidAlphabet = ({ answer }) => !!`${answer}`.replace(/(?:(the|an) +)/gi, '').charAt(0).match(/[a-z]/i);

const Alphabet = ({
  answer, isRevealed,
}) => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'QV', 'W', 'X', 'YZ'];

  const correctCharacter = getCorrectCharacter(answer);

  const choices = alphabet.map((label) => ({ label, isCorrect: label.includes(correctCharacter) }));
  const options = (choices.map(({ isCorrect, label }) => (
    <div className="col-3">
      <Option label={label} isRevealed={isRevealed} isCorrect={isCorrect} key={label} />
    </div>
  )));

  return (
    <div className="container">
      <div className="row">
        {options}
      </div>
    </div>
  );
};

Alphabet.propTypes = {
  answer: PropTypes.string.isRequired,
  isRevealed: PropTypes.bool.isRequired,
};

export { isValidAlphabet, Alphabet };
