import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { getCategories } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
      searchInput: '',
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

  render() {
    const { products, searchInput, categories } = this.state;

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
                  products={ products }
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
