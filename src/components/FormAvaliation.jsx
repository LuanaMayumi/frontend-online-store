import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FormAvaliation extends Component {
  render() {
    const {
      message,
      handleChange,
      onClickButton,
      emailUser,
      description } = this.props;
    return (
      <div
        className="form-container"
      >
        <h1>Avaliações</h1>
        <form>
          <label
            htmlFor="email"
          >
            <input
              name="emailUser"
              id="email"
              data-testid="product-detail-email"
              onChange={ handleChange }
              value={ emailUser }
            />
            E-mail
          </label>
          <input
            type="radio"
            data-testid="1-rating"
            name="rate"
            value="1"
            onChange={ handleChange }
          />
          <input
            type="radio"
            data-testid="2-rating"
            name="rate"
            value="2"
            onChange={ handleChange }
          />
          <input
            type="radio"
            data-testid="3-rating"
            name="rate"
            value="3"
            onChange={ handleChange }
          />
          <input
            type="radio"
            data-testid="4-rating"
            name="rate"
            value="4"
            onChange={ handleChange }
          />
          <input
            type="radio"
            data-testid="5-rating"
            name="rate"
            value="5"
            onChange={ handleChange }
          />
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Escreva algo sobre o produto"
            name="description"
            onChange={ handleChange }
            value={ description }
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

FormAvaliation.propTypes = {
  handleChange: PropTypes.func,
  message: PropTypes.bool,
  onClickButton: PropTypes.func,
}.isRequired;

export default FormAvaliation;
