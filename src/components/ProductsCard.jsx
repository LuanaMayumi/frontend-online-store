import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductsCard extends Component {
  render() {
    const { price, title, thumbnail } = this.props;
    const stringLength = 40;
    return (
      <div
        className="card-product-details"
        data-testid="product"
      >
        <img
          src={ thumbnail }
          alt={ title }
        />
        <p
          className="card-product-name"
          data-testid="shopping-cart-product-name"
        >
          {`${title.substr(0, stringLength)}...`}
        </p>
        <p className="card-product-price">
          <span className="cifrao">R$</span>
          { price.toFixed(2).replace('.', ',') }
        </p>
      </div>
    );
  }
}

export default ProductsCard;

ProductsCard.propTypes = {
  price: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
