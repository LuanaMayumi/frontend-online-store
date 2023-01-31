import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AvaliationProduct extends Component {
  render() {
    const { savedAvaliations } = this.props;
    return (
      <div>
        <h1>
          Avaliação
        </h1>
        { savedAvaliations.map((avaliation, index) => (
          <div key={ index }>
            <p data-testid="review-card-email">
              { avaliation.email }
            </p>
            <p data-testid="review-card-evaluation">
              { avaliation.text }
            </p>
            <p data-testid="review-card-rating">
              { avaliation.rating }
            </p>
          </div>
        ))}
        ;
      </div>
    );
  }
}

AvaliationProduct.propTypes = {
  emailUser: PropTypes.string,
  description: PropTypes.string,
  rate: PropTypes.string,
}.isRequired;
