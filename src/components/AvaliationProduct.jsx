import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/AvaliationProduct.sass';
import { Rating } from 'react-simple-star-rating';

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
            <Rating
              className="avaliation-rating"
              initialValue={ avaliation.rating }
              readonly
              size={ 30 }

            />
            <p data-testid="review-card-evaluation" className="avaliation-text">
              { avaliation.text }
            </p>
          </div>
        ))}
      </div>
    );
  }
}

AvaliationProduct.propTypes = {
  emailUser: PropTypes.string,
  description: PropTypes.string,
  rate: PropTypes.string,
}.isRequired;
