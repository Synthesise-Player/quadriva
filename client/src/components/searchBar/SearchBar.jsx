import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import InputField from '../../elements/InputField';
import Button from '../../elements/Button';


import {
  SearchBarWrapper, Input, Submit,
} from './SearchBar.module.scss';

const SearchBar = ({ handleChange, handleSubmit }) => (
  <form className={SearchBarWrapper}>
    <div className={Input}>
      <InputField handleChange={handleChange} placeholder="Search for playlist..." />
    </div>
    <div className={Submit}>
      <Button name="search" handleClick={handleSubmit}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </div>
  </form>
);

export default SearchBar;

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
