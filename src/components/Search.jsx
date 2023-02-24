import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  render() {
    const { handleChange, onClickButton } = this.props;
    return (
      <div className="search-container">
        <input
          type="text"
          id="search-label"
          data-testid="query-input"
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="query-button"
          onClick={ onClickButton }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  handleChange: PropTypes.func,
  onClickButton: PropTypes.func,
}.isRequired;
