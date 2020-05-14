import React from 'react';
import PropTypes from 'prop-types';

import {
  Option as OptionCSS, Hidden, Correct, Incorrect,
} from './Option.module.scss';

const Option = ({
  label, isRevealed, isCorrect, onClick,
}) => {
  const colourSchemes = [OptionCSS];

  if (isRevealed) {
    colourSchemes.push(isCorrect ? Correct : Incorrect);
  } else {
    colourSchemes.push(Hidden);
  }
  return (
    <button onClick={onClick} className={colourSchemes.join(' ')} type="button">
      {label}
    </button>
  );
};

Option.propTypes = {
  label: PropTypes.string.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Option;
