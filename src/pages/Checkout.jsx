import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ProductsCard from '../components/ProductsCard';
import FormCheckout from '../components/FormCheckout';

export default class Checkout extends Component {
  render() {
    const { location } = this.props;
    const { itemsShoppingCart } = location.state;
    return (
      <div>
        <h1>
          Checkout
        </h1>
        { itemsShoppingCart.map((product, index) => (
          <div
            key={ index }
          >
            <ProductsCard
              title={ product.title }
              price={ product.price }
              thumbnail={ product.thumbnail }
            />
          </div>
        ))}
        <div>
          <FormCheckout { ...this.props } />
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      itemsShoppingCart: PropTypes.shape({
        map: PropTypes.func,
      }),
    }),
  }).isRequired,
};
