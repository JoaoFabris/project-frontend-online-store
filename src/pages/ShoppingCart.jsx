import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { purchases } = this.props;
    return (
      <div>
        {purchases.length === 0
          ? (
            <h3 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h3>
          )

          : <h2>Tá cheio</h2>}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  purchases: PropTypes.array,
}.isRequired;

export default ShoppingCart;
