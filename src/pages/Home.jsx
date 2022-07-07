import React from 'react';
import PropTypes from 'prop-types';

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
      console.log('entrei');
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
    } = this.props;

    return (
      <div>
        <div>
          {categories.map((category) => (
            <label
              data-testid="category"
              htmlFor={ category.id }
              key={ category.id }
            >
              <input
                type="radio"
                id={ category.id }
                name="category"
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
          {loading && <h4>Carregando...</h4>}
        </div>
        <div>
          {this.validProductsByTerms(productsByTerms)
            ? this.validProductsByTerms(productsByTerms)
            : (
              productsByTerms.map((product) => (
                <div
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

}.isRequired;

export default Home;
