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
      cartProducts: [],
      categories: [],
      categoryId: '',
      productId: '',
      productItens: [],
      productsByTerms: undefined,
      loading: false,
      searchInput: '',
      totalCartPrice: 0,
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

  addProductsCart = (e, product) => {
    e.preventDefault();
    this.setState((prevState) => {
      const productExistsInState = prevState.cartProducts
        .find((cartProduct) => cartProduct.id === product.id);

      if (productExistsInState) {
        const newItems = this.updateQuantityCartItem(product, 1);
        return { cartProducts: newItems };
      }
      product.cartQuantity = 1;
      return { cartProducts: [...prevState.cartProducts, product] };
    }, () => this.updateTotalCartPrice());
  }

  updateQuantityCartItem = (product, incrementor, setState = false, cb) => {
    const { cartProducts } = this.state;

    const newCartProducts = cartProducts.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        const quantityAfterIncrementor = cartProduct.cartQuantity + incrementor;

        if (quantityAfterIncrementor === 0) {
          return { ...cartProduct };
        }
        return { ...cartProduct, cartQuantity: cartProduct.cartQuantity + incrementor };
      }
      return cartProduct;
    });
    return setState
      ? this.setState({ cartProducts: newCartProducts }, () => cb()) : newCartProducts;
  }

  onCartQuantityClickHandler = ({ target }, product) => {
    const incr = 1;
    const decr = -1;
    const incrementor = target.className === 'plus' ? incr : decr;
    this.updateQuantityCartItem(product, incrementor, true, this.updateTotalCartPrice);
  }

  updateTotalCartPrice = () => {
    const { cartProducts } = this.state;
    this.setState(() => {
      const total = cartProducts
        .reduce((acc, curr) => acc + (curr.cartQuantity * curr.price), 0);
      return { totalCartPrice: total };
    });
  }

  render() {
    const {
      categories,
      cartProducts,
      loading,
      productsByTerms,
      searchInput,
      productItens,
      totalCartPrice,
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
                addProductsCart={ this.addProductsCart }
              />) }
            />
            <Route
              path="/shoppingCart"
              render={ () => (
                <ShoppingCart
                  cartProducts={ cartProducts }
                  onCartQuantityClickHandler={ this.onCartQuantityClickHandler }
                  totalPrice={ totalCartPrice }
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
