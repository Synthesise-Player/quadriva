/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import { CardWrapper } from './Card.module.css';

const Card = ({ children }) => (
  <div className={CardWrapper}>
    {children}
  </div>
);

export default Card;

Card.propTypes = {
  children: PropTypes.element.isRequired,
};
