import './Home.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  validProductsByTerms = (products) => {
    if (products === undefined) {
      return (
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>);
    }
    if (products.length === 0) {
      return (
        <h3>Nenhum produto foi encontrado</h3>
      );
    }
  }

  render() {
    const {
      productsByTerms,
      searchInput,
      onInputChange,
      onClick,
      loading,
      categories,
      onCategoryClick,
      addProductsCart,
    } = this.props;

    return (
      <div>
        <div className="category">
          {categories.map((category) => (
            <label
              data-testid="category"
              htmlFor={ category.id }
              key={ category.id }
              className="category-label"
            >
              <input
                type="radio"
                id={ category.id }
                name="category"
                onClick={ onCategoryClick }
              />
              <p>{ category.name }</p>
            </label>))}
        </div>
        <div>
          <label htmlFor="search-input">
            <input
              value={ searchInput }
              name="searchInput"
              id="search-input"
              type="text"
              onChange={ onInputChange }
              data-testid="query-input"
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ () => onClick() }
          >
            Pesquisar
          </button>
          <button type="button">
            <Link
              to="/shoppingCart"
              data-testid="shopping-cart-button"
            >
              Carrinho
            </Link>
          </button>
          {loading && <h4>Carregando...</h4>}
        </div>
        <div className="search">
          {this.validProductsByTerms(productsByTerms)
            ? this.validProductsByTerms(productsByTerms)
            : (
              productsByTerms.map((product) => (
                <div
                  className="products"
                  key={ product.id }
                  data-testid="product"
                >
                  <div>
                    <h3>{product.title}</h3>
                    <img
                      src={ product.thumbnail }
                      alt={ product.title }
                    />
                  </div>
                  <div>
                    <h6>{`R$ ${product.price}`}</h6>
                  </div>
                  <button
                    type="button"
                    onClick={ () => addProductsCart(product) }
                    data-testid="product-add-to-cart"
                  >
                    Adicionar ao carrinho
                  </button>
                  <Link
                    to="/detailsProduct"
                    data-testid="product-detail-link"
                    onClick={ () => onProductClick(product.id) }
                  >
                    <div>
                      <h3>{product.title}</h3>
                      <img
                        src={ product.thumbnail }
                        alt={ product.title }
                      />
                    </div>
                    <div>
                      <h6>{`R$ ${product.price}`}</h6>
                    </div>
                  </Link>
                </div>
              ))
            )}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  products: PropTypes.array,
  searchInput: PropTypes.string,
  onInputChange: PropTypes.func,
  onCategoryClick: PropTypes.func,

}.isRequired;

export default Home;
