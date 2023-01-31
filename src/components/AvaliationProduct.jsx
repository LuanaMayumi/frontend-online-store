import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/AvaliationProduct.sass';

export default class AvaliationProduct extends Component {
  render() {
    const { savedAvaliations } = this.props;
    return (
      <div className="avaliations-container">
        { savedAvaliations.map((avaliation, index) => (
          <div key={ index } className="avaliation-card">
            <p data-testid="review-card-email" className="avaliation-email">
              { avaliation.email }
            </p>
            <p data-testid="review-card-rating" className="avaliation-rating">
              { avaliation.rating }
            </p>
            <p data-testid="review-card-evaluation" className="avaliation-text">
              { avaliation.text }
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
