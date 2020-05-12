import React from 'react';
import PropTypes from 'prop-types';

import { InputFieldWrapper } from './InputField.module.scss';

const InputField = ({ handleChange, placeholder }) => (
  <div className={InputFieldWrapper}>
    <input type="text" onChange={handleChange} placeholder={placeholder} name="search" />
  </div>
);

export default InputField;

InputField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
