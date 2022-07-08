import React from 'react';
import PropTypes from 'prop-types';

class Details extends React.Component {
  render() {
    const { productItens, loading } = this.props;
    return (
      <div>
        {loading ? <h1>Carregando...</h1> : (
          <div>
            <div>
              <h1
                data-testid="product-detail-name"
              >
                {`${productItens.title} - R$ ${productItens.price}`}

              </h1>
            </div>
            <div>
              <img
                src={ productItens.thumbnail }
                alt={ `Imagem ${productItens.title}` }
              />
              <div>
                <ul>Especificações</ul>
                {productItens.attributes.map((especificacao) => (
                  <li
                    key={ especificacao.id }
                  >
                    {`${especificacao.name}: ${especificacao.value_name}`}

                  </li>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Details.propTypes = {
  purchases: PropTypes.array,
}.isRequired;

export default Details;
