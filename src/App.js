import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchInput: '',
      categoryId: '',
      purchases: [],
      productsByTerms: undefined,
      loading: false,
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

  render() {
    const {
      searchInput,
      productsByTerms,
      loading,
      categories,
      purchases,
    } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              path="/shoppingCart"
              render={ () => <ShoppingCart purchases={ purchases } /> }
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
