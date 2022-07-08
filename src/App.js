import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
      categories: [],
      categoryId: '',
      loading: false,
      productsByTerms: undefined,
      searchInput: '',
    };
  }

  componentDidMount() {
    this.showCategories();
  }

  showCategories = async () => {
    const arrayCategories = await getCategories();
    this.setState({
      categories: arrayCategories,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onCategoryClick = ({ target }) => {
    const { id } = target;
    this.setState({
      categoryId: id,
    }, async () => this.fetchListProducts());
  }

  fetchListProducts = async () => {
    const { searchInput, categoryId } = this.state;

    this.setState({
      loading: true,
    },
    async () => {
      const products = await getProductsFromCategoryAndQuery(categoryId, searchInput);
      this.setState({
        loading: false,
        productsByTerms: products.results,
      });
    });
  };

  addProductsCart = (product) => {
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, product],
    }));
  }

  render() {
    const {
      categories,
      cartProducts,
      loading,
      productsByTerms,
      searchInput,
    } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              path="/shoppingCart"
              render={ () => (
                <ShoppingCart
                  cartProducts={ cartProducts }
                />) }
            />
            <Route
              exact
              path="/"
              render={ () => (
                <Home
                  onInputChange={ this.onInputChange }
                  searchInput={ searchInput }
                  onClick={ this.fetchListProducts }
                  onCategoryClick={ this.onCategoryClick }
                  productsByTerms={ productsByTerms }
                  loading={ loading }
                  categories={ categories }
                  addProductsCart={ this.addProductsCart }
                />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
