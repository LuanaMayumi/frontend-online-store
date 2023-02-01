import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Checkout.sass';

import ProductsCard from '../components/ProductsCard';
import FormCheckout from '../components/FormCheckout';
import Header from '../components/Header';

export default class Checkout extends Component {
  render() {
    const { location } = this.props;
    const { itemsShoppingCart, totalCart } = location.state;
    return (
      <div>
        <Header />
        <div className="main-container">
          <div className="container-products-cart">
            <h1>
              Revise seus produtos
            </h1>
            { itemsShoppingCart.map((product, index) => (
              <div
                key={ index }
              >
                <hr />
                <ProductsCard
                  title={ product.title }
                  price={ product.price }
                  thumbnail={ product.thumbnail }
                />
              </div>
            ))}
            <hr />
            <div className="total-cart">
              <p>
                Total:
                { ` R$ ${totalCart}` }
              </p>
            </div>
          </div>
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
      totalCart: PropTypes.string,
    }),
  }).isRequired,
};
