import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    infoProduct: [],
    id: '',
    productsLocalStorage: [],
    emailUser: '',
    description: '',
    rate: '',
    message: false,
  };

  // Ler o Local Storage com o getItem, depois setar no productsLocalStorage
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items);
    if (!itemsArray) {
      this.setState({
        productsLocalStorage: [],
        id,
      }, this.getInfoProduct);
    } else {
      this.setState({
        productsLocalStorage: itemsArray,
        id,
      }, this.getInfoProduct);
    }
  }

  getInfoProduct = async () => {
    const { id } = this.state;
    const response = await getProductById(id);
    this.setState({
      infoProduct: response,
    });
  };

  // Requisito 09
  addProductToCart = (product) => {
    // Adicionar chave quantidade no product
    // Verificar se o produto já existe no Local Storage, se existir aumentar a quantity (quantity + 1), se não existir (quantity: 1)
    this.setState((prevState) => ({
      productsLocalStorage: [...prevState.productsLocalStorage, product],
    }), () => {
      const { productsLocalStorage } = this.state;
      localStorage
        .setItem('ID_PRODUTO', JSON.stringify(productsLocalStorage));
    });
  };

  // Requisito 11
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  onClickButton = () => {
    const { emailUser, description, rate } = this.state;
    if (!emailUser && !description && !rate) {
      this.setState({
        message: true,
      });
    } else {
      this.setState({
        message: false,
      });
    }
  };

  render() {
    const { infoProduct, message } = this.state;
    return (
      <div
        data-testid="product"
      >
        <Header />
        <h1>Detalhes do produto</h1>
        <p
          data-testid="product-detail-name"
        >
          {infoProduct.title}
        </p>
        <p
          data-testid="product-detail-price"
        >
          { infoProduct.price }
        </p>
        <p>
          { infoProduct.condition }
        </p>
        <img
          data-testid="product-detail-image"
          src={ infoProduct.thumbnail }
          alt={ infoProduct.title }
        />
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addProductToCart(infoProduct) }
          id={ infoProduct.id }
        >
          Eu quero
        </button>
        {/* <Header data-testid="shopping-cart-button" /> */}
        <div
          className="form-container"
        >
          <h1>Avaliações</h1>
          <form>
            <label
              htmlFor="email"
            >
              <input
                name="emailUser"
                id="email"
                data-testid="product-detail-email"
                onChange={ this.handleChange }
              />
              E-mail
            </label>
            <input
              type="radio"
              data-testid="1-rating"
              name="rate"
              value="1"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              data-testid="2-rating"
              name="rate"
              value="2"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              data-testid="3-rating"
              name="rate"
              value="3"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              data-testid="4-rating"
              name="rate"
              value="4"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              data-testid="5-rating"
              name="rate"
              value="5"
              onChange={ this.handleChange }
            />
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Escreva algo sobre o produto"
              name="description"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.onClickButton }
            >
              {' '}
              Avaliar
            </button>
            { message && <p data-testid="error-msg"> Campos inválidos </p>}
          </form>
        </div>
      </div>
    );
  }
}
export default ProductDetails;
ProductDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;
