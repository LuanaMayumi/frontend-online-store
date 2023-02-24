import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cart from '../assets/cart.svg';
import Search from './Search';
import logo from '../assets/logo.svg';

class Header extends Component {
  render() {
    const { handleChange, onClickButton, itemsOnCart } = this.props;
    return (
      <div className="container-header">
        <div className="logo-div">
          <Link to="/">
            <img src={ logo } alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="search-div">
          <Search
            handleChange={ handleChange }
            onClickButton={ onClickButton }
          />
        </div>
        <div className="cart-link">
          <Link
            to="/carrinho"
            data-testid="shopping-cart-button"
          >
            <img src={ cart } alt="Carrinho de compras" />
            <p>{ itemsOnCart }</p>
          </Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  handleChange: PropTypes.func,
  itemsOnCart: PropTypes.any,
  onClickButton: PropTypes.any,
}.isRequired;
export default Header;
