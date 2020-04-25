import React from 'react';
import PropTypes from 'prop-types';

import { RecordWrapper } from './Record.module.css';


const Record = ({ url }) => (
  <imgContainer>
    <img crossOrigin="anonymous" src={url} className={RecordWrapper} alt="albumImage" />
  </imgContainer>
);

export default Record;

Record.propTypes = {
  url: PropTypes.string.isRequired,
};
