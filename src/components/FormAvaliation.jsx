import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Rating } from 'react-simple-star-rating';
import '../styles/FormAvaliation.sass';

class FormAvaliation extends Component {
  handleRating = (rating) => {
    const { handleChange } = this.props;
    const element = {
      target: {
        value: rating,
        name: 'rate',
      },
    };
    handleChange(element);
  };

  render() {
    const {
      message,
      onClickButton,
      handleChange,
      emailUser,
      description } = this.props;
    return (
      <div
        className="form-container"
      >
        <h1>Avaliações</h1>
        <form>
          <input
            name="emailUser"
            id="email"
            data-testid="product-detail-email"
            className="input-email"
            onChange={ handleChange }
            value={ emailUser }
            placeholder="Email"
          />
          <Rating
            onClick={ this.handleRating }
            size={ 30 }
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
