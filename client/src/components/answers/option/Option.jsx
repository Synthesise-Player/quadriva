import React from 'react';
import PropTypes from 'prop-types';

import {
  Option as OptionCSS, Hidden, Correct, Incorrect,
} from './Option.module.scss';

const Option = ({
  label, isRevealed, isCorrect,
}) => {
  const colourSchemes = [OptionCSS];

  if (isRevealed) {
    colourSchemes.push(isCorrect ? Correct : Incorrect);
  } else {
    colourSchemes.push(Hidden);
  }
  return (
    <button className={colourSchemes.join(' ')} type="button">
      {label}
    </button>
  );
};

Option.propTypes = {
  label: PropTypes.string.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
};

export default Option;
