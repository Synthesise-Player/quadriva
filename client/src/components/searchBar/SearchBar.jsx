import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../../elements/InputField';
import Button from '../../elements/Button';

import { SearchBarWrapper, SearchBarInner } from './SearchBar.module.css';

const SearchBar = ({ handleChange, handleSubmit }) => (
  <form className={SearchBarWrapper}>
    <div className="container">
      <div className={SearchBarInner}>
        <div className="row">
          <div className="col-9">
            <InputField handleChange={handleChange} placeholder="Search for playlist..." />
          </div>
          <div className="col-3">
            <Button name="search" handleClick={handleSubmit}>
              <span role="img" aria-labelledby="search">🔍</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </form>
);

export default SearchBar;

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
