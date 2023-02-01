import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Cart.sass';
import Header from '../components/Header';
import exclude from '../assets/exclude.svg';
import decrease from '../assets/decrease.svg';
import increase from '../assets/increase.svg';

class ShoppingCart extends Component {
  state = {
    itemsLS: [],
    totalCart: 0,
  };

  componentDidMount() {
    this.getFromLS();
  }

  getFromLS = () => {
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items);
    this.setState({
      itemsLS: itemsArray, // items que estão no LS
    }, this.totalOnCart);
  };

  // Requisito 10

  filterSpecificProduct = (idShoppingCart) => { // qdo clicamos em EXCLUIR, chama essa func
    // retorna todos os produtos menos o que foi clicado
    const { itemsLS } = this.state; // pega os itens do LS
    const result = itemsLS.filter((item) => (item.id !== idShoppingCart)); // se o id do item do ARRAY for diferente do parametro, retorna TRUE
    this.setState({
      itemsLS: result, // seta o estado com o ítem ja excluído
    }, () => {
      this.totalOnCart();
      const { itemsLS: newItems } = this.state;
      // renomeia a variável (nao o estado)
      localStorage
        .setItem('ID_PRODUTO', JSON.stringify(newItems)); // salva no LS
    });
  };

  // REQUISITO 10 - SOMAR OS ITENS

  increase = (productCart) => {
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items) || [];
    const newItemsArry = itemsArray.map((item) => { // o map vai de produto em produto e altera retornando um novo array
      if (item.id === productCart.id) {
        item.quantity += 1;
      }
      return item;
    });
    localStorage
      .setItem('ID_PRODUTO', JSON.stringify(newItemsArry));
    this.setState({
      itemsLS: newItemsArry,
    }, this.totalOnCart);
  };

  decrease = (productCart) => {
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items) || [];
    const newItems = itemsArray.map((item) => { // o map vai de produto em produto e altera retornando um novo array
      if (item.id === productCart.id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    localStorage
      .setItem('ID_PRODUTO', JSON.stringify(newItems));
    this.setState({
      itemsLS: newItems,
    }, this.totalOnCart);
  };

  totalOnCart = () => {
    const { itemsLS: cartItems } = this.state;
    const total = cartItems
      .map((product) => (product.price * product.quantity))
      .reduce((acc, curr) => (acc + curr), 0);
    this.setState({
      totalCart: total.toFixed(2),
    });
  };

  render() {
    const { itemsLS, totalCart } = this.state;
    const { history } = this.props;
    const stringLength = 40;
    return (
      <div>
        <Header />
        <div className="container-cart">
          <div className="container-products-cart">
            <h2>Carrinho de Compras</h2>
            {!itemsLS
              ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              : (itemsLS.map((product, index) => (
                <div key={ `${index}${product.id}` }>
                  <hr />
                  <div
                    className="item-cart"
                  >
                    <button
                      type="button"
                      className="exclude-btn"
                      data-testid="remove-product"
                      onClick={ () => this.filterSpecificProduct(product.id) }
                    >
                      <img src={ exclude } alt="Botão excluir" />
                    </button>
                    <img
                      className="product-img"
                      src={ product.thumbnail }
                      alt={ product.title }
                    />
                    <p
                      className="card-product-name"
                      data-testid="shopping-cart-product-name"
                    >
                      {`${product.title.substr(0, stringLength)}...`}
                    </p>
                    <button
                      type="button"
                      className="product-increase"
                      onClick={ () => this.increase(product) }
                    >
                      <img src={ increase } alt="Botão increase" />
                    </button>
                    <p className="product-quantity">
                      {product.quantity}
                    </p>
                    <button
                      type="button"
                      className="product-decrease"
                      onClick={ () => this.decrease(product) }
                    >
                      <img src={ decrease } alt="Botão decrease" />
                    </button>
                    <p className="card-product-price">
                      <span className="cifrao">R$</span>
                      { (product.price * product.quantity).toFixed(2).replace('.', ',') }
                    </p>
                  </div>
                </div>
              )))}
          </div>
          <div className="total-cart">
            <p>Valor total da compra:</p>
            <p>
              <span>R$</span>
              {String(totalCart).replace('.', ',')}
            </p>
            <button
              type="button"
              data-testid="checkout-products"
              onClick={ () => history.push({
                pathname: '/checkout',
                state: { itemsShoppingCart: itemsLS },
              }) }
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ShoppingCart;
