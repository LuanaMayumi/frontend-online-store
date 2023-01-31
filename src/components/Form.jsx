import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  render() {
    const { message, onClickButton, handleChange } = this.props;
    return (
      <div
        className="div-form-container"
      >
        <h1>Avaliações</h1>
        <form className="form-container">
          <div className="email-rate">
            <input
              className="input-email"
              name="emailUser"
              id="email"
              data-testid="product-detail-email"
              onChange={ handleChange }
              placeholder="Email"
            />
            <div className="form-input">
              <input
                className="input-radio"
                type="radio"
                data-testid="1-rating"
                name="rate"
                value="1"
                onChange={ handleChange }
              />
              <input
                className="input-radio"
                type="radio"
                data-testid="2-rating"
                name="rate"
                value="2"
                onChange={ handleChange }
              />
              <input
                className="input-radio"
                type="radio"
                data-testid="3-rating"
                name="rate"
                value="3"
                onChange={ handleChange }
              />
              <input
                className="input-radio"
                type="radio"
                data-testid="4-rating"
                name="rate"
                value="4"
                onChange={ handleChange }
              />
              <input
                className="input-radio"
                type="radio"
                data-testid="5-rating"
                name="rate"
                value="5"
                onChange={ handleChange }
              />
            </div>
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Escreva algo sobre o produto"
            name="description"
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ onClickButton }
          >
            {' '}
            Avaliar
          </button>
          { message && <p data-testid="error-msg"> Campos inválidos </p>}
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  message: PropTypes.string,
  handleChange: PropTypes.func,
  onClickButton: PropTypes.func,
}.isRequired;
