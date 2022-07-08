import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  render() {
    const {
      cartProducts,
    } = this.props;
    return (
      <div>
        { cartProducts.length === 0
          ? (
            <div>
              <h3 data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </h3>
              <Link
                to="/"
              >
                Início
              </Link>
            </div>
          )

          : (
            <div>
              <h2
                data-testid="shopping-cart-product-quantity"
              >
                {`Quantidade de itens ${cartProducts.length}`}
              </h2>
              {cartProducts.map((product) => (
                <div
                  key={ product.id }
                  data-testid="product"
                >
                  <div>
                    <h3
                      data-testid="shopping-cart-product-name"
                    >
                      {product.title}
                    </h3>
                    <img
                      src={ product.thumbnail }
                      alt={ product.title }
                    />
                  </div>
                  <div>
                    <h5>{`R$ ${product.price}`}</h5>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  purchases: PropTypes.array,
}.isRequired;

export default ShoppingCart;
