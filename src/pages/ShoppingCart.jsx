import React, { Component } from 'react';
import '../styles/Cart.sass';
import Header from '../components/Header';
import ProductsCard from '../components/ProductsCard';

class ShoppingCart extends Component {
  state = {
    itemsLS: [],
  };

  componentDidMount() {
    this.getFromLS();
  }

  getFromLS = () => {
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items);
    this.setState({
      itemsLS: itemsArray, // items que estão no LS
    });
  };

  // Requisito 10

  filterSpecificProduct = (idShoppingCart) => { // qdo clicamos em EXCLUIR, chama essa func
    // retorna todos os produtos menos o que foi clicado
    const { itemsLS } = this.state; // pega os itens do LS
    const result = itemsLS.filter((item) => (item.id !== idShoppingCart)); // se o id do item do ARRAY for diferente do parametro, retorna TRUE
    this.setState({
      itemsLS: result, // seta o estado com o ítem ja excluído
    }, () => {
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
    });
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
    });
  };

  render() {
    const { itemsLS } = this.state;
    return (
      <div>
        <Header />
        <div className="container-cart">
          <h2>Carrinho de Compras</h2>
          <div className="container-products-cart">
            {!itemsLS
              ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              : (itemsLS.map((product, index) => (
                <div
                  key={ `${index}${product.id}` }
                >
                  <hr />
                  <div className="item-cart">
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => this.filterSpecificProduct(product.id) }
                    >
                      Excluir
                    </button>
                    <ProductsCard
                      title={ product.title }
                      price={ product.price }
                      thumbnail={ product.thumbnail }
                    />
                    <button
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ () => this.increase(product) }
                    >
                      +
                    </button>
                    <p data-testid="shopping-cart-product-quantity">
                      {product.quantity}
                    </p>
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.decrease(product) }
                    >
                      -
                    </button>

                  </div>
                </div>
              )))}
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
