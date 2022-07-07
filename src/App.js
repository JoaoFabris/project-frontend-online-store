import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchInput: '',
      categoryId: '',
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

  fetchListProducts = async () => {
    const { searchInput, categoryId } = this.state;

    this.setState({
      loading: true,
    },
    async () => {
      const products = await getProductsFromCategoryAndQuery(categoryId, searchInput);
      console.log({ products });
      this.setState({
        loading: false,
        productsByTerms: products,
      });
    });
  };

  render() {
    const {
      searchInput,
      productsByTerms,
      loading,
      categories,
    } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              render={ () => (
                <Home
                  onInputChange={ this.onInputChange }
                  searchInput={ searchInput }
                  onClick={ this.fetchListProducts }
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
