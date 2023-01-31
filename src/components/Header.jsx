import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cart from '../assets/cart.svg';
import Search from './Search';
import logo from '../assets/logo.svg';

class Header extends Component {
  render() {
    const { handleChange, onClickButton } = this.props;
    return (
      <div className="container-header">
        <Search
          handleChange={ handleChange }
          onClickButton={ onClickButton }
        />
        <Link to="/">
          <img src={ logo } alt="Logo" className="logo" />
        </Link>
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          <img src={ cart } alt="Carrinho de compras" />
        </Link>
      </div>
    );
  }
}
export default Header;

Header.propTypes = {
  onClickButton: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
