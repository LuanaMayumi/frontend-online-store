import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import '../styles/ProductDetails.sass';
import Form from '../components/Form';

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
        className="page-product-details"
      >
        <Header
          handleChange={ this.handleChange }
          onClickButton={ this.onClickButton }
        />
        <div>
          {/* <div className="product-image"> */}
          {
            infoProduct.length !== 0 && (
              <div className="container-image-product">
                <p
                  data-testid="product-detail-name"
                >
                  {infoProduct.title}
                </p>
                <img
                  data-testid="product-detail-image"
                  src={ infoProduct.pictures[0].url }
                  alt={ infoProduct.title }
                />
                {/* </div> */}
                {/* <div className="product-details"> */}
                <p
                  data-testid="product-detail-price"
                  className="card-product-price"
                >
                  <span className="cifrao">R$</span>
                  { infoProduct.price.toFixed(2).replace('.', ',') }
                </p>
                {/* <p>
                  Condição do Produto:
                  <br />
                  { infoProduct.condition }
                </p> */}
                <button
                  type="button"
                  data-testid="product-detail-add-to-cart"
                  onClick={ () => this.addProductToCart(infoProduct) }
                  id={ infoProduct.id }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            )
          }
        </div>
        {/* </div> */}
        {/* <Header data-testid="shopping-cart-button" /> */}
        <Form
          message={ message }
          onClickButton={ this.onClickButton }
          handleChange={ this.handleChange }
        />
      </div>
    );
  }
}
export default ProductDetails;

ProductDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;
