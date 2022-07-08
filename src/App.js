import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Details from './pages/Details';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import { getCategories,
  getProductsFromCategoryAndQuery,
  getProduct } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchInput: '',
      categoryId: '',
      productId: '',
      productItens: [],
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

  onProductClick = (id) => {
    this.setState({
      productId: id,
      loading: true,
    }, async () => this.fetchProductsDetail());
  }

  fetchProductsDetail = async () => {
    const { productId } = this.state;
    this.setState({
      loading: true,
    },
    async () => {
      const products = await getProduct(productId);
      console.log(products);
      this.setState({
        loading: false,
        productItens: products,
      });
    });
  };

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
      productItens,
    } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              path="/detailsProduct"
              render={ () => (<Details
                productItens={ productItens }
                loading={ loading }
              />) }
            />
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
                  onProductClick={ this.onProductClick }
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
