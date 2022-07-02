import React from 'react';

import '../styles/search.css';
/* import { AiOutlineSearch } from 'react-icons/ai'; */
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
    };
  }

  canButtonBeActivated = () => {
    const { name } = this.state;
    const minChar = 2;
    const isDisabled = name.length < minChar;

    this.setState({
      isDisabled,
    });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    }, this.canButtonBeActivated);
  }

  render() {
    const { name, isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form className="searchFormContainer">
          <input
            type="search"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
            value={ name }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            className="styledButton"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
