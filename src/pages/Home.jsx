import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AnyProduct from '../components/AnyProduct';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProductsCard from '../components/ProductsCard';
import Search from '../components/Search';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
// import addProductsLocalStorage from '../services/addLocalStorage';

class Home extends Component {
  state = {
    isLoading: false,
    categories: [],
    products: [],
    search: '',
    selectedProducts: [],
  };

  componentDidMount() {
    this.categoriesList();
    this.getFromLS();
  }

  getFromLS = () => {
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items);
    console.log(itemsArray);
    this.setState({
      selectedProducts: itemsArray, // items que estão no LS
    });
  };

  categoriesList = () => { // func criada para pegar a lista de todas as categorias
    this.setState({
      isLoading: true,
    }, async () => {
      const categories = await getCategories();
      this.setState({
        isLoading: false,
        categories, // setando o estado com o resultado da API que mostra as categorias
      });
      // console.log(categories);
    });
  };

  handleChange = ({ target }) => { // func criada pra pegar o valor digitado no campo de busca
    const { value } = target;
    // console.log(value);
    this.setState({
      search: value,
    });
    // console.log(search);
  };

  onClickButton = () => { // func criada pra fazer uma requisição na API de acordo com a palavra digitada no campo de busca - essa função é acionada qdo clica no botão de pesquisa
    const { search } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      const response = await getProductsFromCategoryAndQuery(undefined, search);
      // console.log(response);
      if (response.results.length < 1) {
        console.log('teste');
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
    });
  };

  resultOfCategory = ({ target }) => { // func criada pra listar os produtos de uma determinada categoria escolhida na Home
    const { id } = target;
    // console.log(target); // mostra todos os atributos do elemento que eu clico, <button>
    this.setState({
      isLoading: true,
    }, async () => {
      const response = await getProductsFromCategoryAndQuery(id, undefined);
      // console.log(response.results);
      this.setState({
        isLoading: false,
        products: response.results,
      });
    });
  };

  // REQUISITO 8
  addProductShoppingCart = (product) => { // product é o produto inteiro (nome, imagem, valor)
    // FUNC criada para add o produto clicado ao carrinho (shoppingCart) e salvar no LS
    this.setState((prevState) => ({
      selectedProducts: [...prevState.selectedProducts, ...[{ ...product, quantity: 1 }]], // pega o valor anterior (prevState), os produtos adicionados, add o novo e criando a chave quantity
    }), () => {
      const { selectedProducts } = this.state;
      localStorage
        .setItem('ID_PRODUTO', JSON.stringify(selectedProducts)); // salva no local storage a lista de produtos que foi add no carrinho
    });
  };

  render() {
    const { isLoading, categories, products } = this.state;
    return (
      <div>
        <Header />
        <Search
          handleChange={ this.handleChange }
          onClickButton={ this.onClickButton }
        />
        {isLoading ? <Loading /> : (
          <div>
            {categories.map((categorie) => (
              <li
                key={ categorie.id }
              >
                <button
                  data-testid="category"
                  type="button"
                  onClick={ this.resultOfCategory }
                  id={ categorie.id }
                >
                  {categorie.name}
                </button>
              </li>))}
          </div>
        )}
        {!products ? <AnyProduct /> : (
          <div>
            {products.map((product) => (
              <div
                key={ product.id }
              >
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
                  Eu quero
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default Home;
