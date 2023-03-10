import React, { Component } from 'react';
import '../styles/App.sass';
import { Link } from 'react-router-dom';
import AnyProduct from '../components/AnyProduct';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProductsCard from '../components/ProductsCard';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

class Home extends Component {
  state = {
    isLoading: false,
    categories: [],
    products: [],
    search: '',
    selectedProducts: [],
    itemsOnCart: 0,
    msgInicio: true,
  };

  componentDidMount() {
    this.categoriesList();
    this.getFromLS();
    this.getFromLS2();
  }

  getFromLS2 = () => {
    const baseProducts = localStorage.getItem('ID_PRODUTO') ?? '[]';
    console.log(baseProducts);
    const products = JSON.parse(baseProducts);
    const itemsOnCart = products
      .map((item) => item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    this.setState({ itemsOnCart });
  };

  getFromLS = () => {
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items);
    if (!itemsArray) {
      this.setState({
        selectedProducts: [],
      });
    } else {
      this.setState({
        selectedProducts: itemsArray, // items que estão no LS
      });
    }
  };

  categoriesList = () => {
    // func criada para pegar a lista de todas as categorias
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        const categories = await getCategories();
        this.setState({
          isLoading: false,
          categories, // setando o estado com o resultado da API que mostra as categorias
        });
      },
    );
  };

  handleChange = ({ target }) => {
    // func criada pra pegar o valor digitado no campo de busca
    const { value } = target;
    this.setState({
      search: value,
    });
  };

  onClickButton = () => {
    // func criada pra fazer uma requisição na API de acordo com a palavra digitada no campo de busca - essa função é acionada qdo clica no botão de pesquisa
    const { search } = this.state;
    this.setState(
      {
        isLoading: true,
        msgInicio: false,
      },
      async () => {
        const response = await getProductsFromCategoryAndQuery(
          undefined,
          search,
        );

        if (response.results.length < 1) {
          this.setState({
            isLoading: false,
            products: false,
          });
        } else {
          this.setState({
            isLoading: false,
            products: response.results,
          });
        }
      },
    );
  };

  resultOfCategory = ({ target }) => {
    // func criada pra listar os produtos de uma determinada categoria escolhida na Home
    const { id } = target;
    // mostra todos os atributos do elemento que eu clico, <button>
    this.setState(
      {
        isLoading: true,
        msgInicio: false,
        products: [],
      },
      async () => {
        const response = await getProductsFromCategoryAndQuery(id, undefined);
        this.setState({
          isLoading: false,
          products: response.results,
        });
      },
    );
  };

  // REQUISITO 8
  addProductShoppingCart = (product) => {
    // product é o produto inteiro (nome, imagem, valor)
    // FUNC criada para add o produto clicado ao carrinho (shoppingCart) e salvar no LS
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items) || [];
    if (itemsArray.some((item) => item.id === product.id)) {
      // se o product (clicado) existe no array retornado do LS, quantity + 1. Se nao existir, adiciona o número 1 (linha 108)
      const newItemsArry = itemsArray.map((item) => {
        // o map vai de produto em produto e altera retornando um novo array
        if (item.id === product.id) {
          item.quantity += 1;
        }
        return item;
      });
      localStorage.setItem('ID_PRODUTO', JSON.stringify(newItemsArry));
      this.setState({
        selectedProducts: newItemsArry,
      }, this.getFromLS2());
    } else {
      this.setState(
        (prevState) => ({
          selectedProducts: [
            ...prevState.selectedProducts,
            ...[{ ...product, quantity: 1 }],
          ], // pega o valor anterior (prevState), os produtos adicionados, add o novo e criando a chave quantity
        }),
        () => {
          const { selectedProducts } = this.state;
          localStorage.setItem('ID_PRODUTO', JSON.stringify(selectedProducts));
          this.getFromLS2();
        },
      );
    }
  };

  render() {
    const { isLoading, categories, products, itemsOnCart, msgInicio } = this.state;
    return (
      <div>
        <Header
          handleChange={ this.handleChange }
          onClickButton={ this.onClickButton }
          itemsOnCart={ itemsOnCart }
        />
        <div className="container-main">
          <div className="container-categories">
            <p>Categorias</p>
            <hr />
            {categories.map((categorie) => (
              <li key={ categorie.id }>
                <button
                  className="btn-categories"
                  data-testid="category"
                  type="button"
                  onClick={ this.resultOfCategory }
                  id={ categorie.id }
                >
                  {categorie.name}
                </button>
              </li>
            ))}
          </div>

          {msgInicio
          && (
            <div className="msgInicio">
              <h1>VOCÊ AINDA NÃO REALIZOU UMA BUSCA</h1>
              <p>Digite algum tema de pesquisa ou selecione uma categoria</p>
            </div>) }

          {isLoading && <Loading />}

          {!products ? (
            <AnyProduct />
          ) : (
            <div className="container-products">
              {products.map((product) => (
                <div key={ product.id } className="card-product">
                  <Link
                    to={ `/detalhesProduto/${product.id}` }
                    key={ product.id }
                    data-testid="product-detail-link"
                  >
                    <ProductsCard
                      key={ product.id }
                      title={ product.title }
                      price={ product.price }
                      thumbnail={ product.thumbnail }
                    />
                  </Link>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ () => this.addProductShoppingCart(product) }
                    id={ product.id }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
