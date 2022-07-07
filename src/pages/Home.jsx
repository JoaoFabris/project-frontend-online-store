import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
  render() {
    const { products, searchInput, onInputChange, categories } = this.props;
    return (
      <div>
        <div>
          {categories.map((categorie) => {
            <label 
              data-testid="category" 
              htmlFor={categorie.id} 
              key={categorie.id}
            >
              <input 
                type="radio"
                id={ categorie.id } 
              />
              <p>{ categorie.name }</p>
            </label>
          })}
        </div>
        <div>
          <label htmlFor="search-input">
            <input
              value={ searchInput }
              name="searchInput"
              id="search-input"
              type="text"
              onChange={ onInputChange }
            />
          </label>
        </div>
        <div>
          {products.length === 0 ? (
            <h3 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h3>
          ) : (
            <h3>OIII</h3>
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
