/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper } from './Button.module.css';

const Button = ({
  type, name, handleClick, children, value,
}) => (
  <div className={ButtonWrapper}>
    <button type={type} value={value} name={name} onClick={handleClick}>
      {children}
    </button>
  </div>
);

export default Button;

Button.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
