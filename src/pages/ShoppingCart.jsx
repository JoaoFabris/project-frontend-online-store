import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  render() {
    const {
      cartProducts,
      onCartQuantityClickHandler,
      totalPrice,
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
              {cartProducts.map((product, index) => (
                <div
                  key={ index }
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
                  <div className="quantity" style={ { display: 'flex', height: '2em', alignItems: 'center' } }>
                    <button
                      onClick={ (e) => onCartQuantityClickHandler(e, product) }
                      type="button"
                      className="minus"
                      data-testid="product-decrease-quantity"
                    >
                      -
                    </button>
                    <h5 data-testid="shopping-cart-product-quantity">{product.cartQuantity}</h5>
                    <button
                      onClick={ (e) => onCartQuantityClickHandler(e, product) }
                      type="button"
                      className="plus"
                      data-testid="product-increase-quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="total-pricce">
                Valor total de compra: R$
                {totalPrice}
              </div>
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
