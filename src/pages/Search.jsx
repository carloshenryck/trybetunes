import React from 'react';

import '../styles/search.css';
/* import { AiOutlineSearch } from 'react-icons/ai'; */
import Header from '../components/Header';
import Loading from '../components/Loading';
import Albums from '../components/Albums';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
      isLoading: false,
      hasSearch: false,
      whatISearched: '',
      albums: [],
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

  searchAlbums = async (name) => {
    const result = await searchAlbumsAPI(name);
    this.setState({
      isLoading: false,
      hasSearch: true,
      albums: result,
    });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      name: '',
      isDisabled: true,
      isLoading: true,
      whatISearched: name,
    }, () => this.searchAlbums(name));
  }

  render() {
    const { name, isDisabled, isLoading, hasSearch, albums, whatISearched } = this.state;

    const form = (
      <>
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
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        { hasSearch && <Albums albums={ albums } whatISearched={ whatISearched } /> }
      </>
    );

    const load = (
      <div className="searchLoading">
        <Loading
          type="spin"
          color="rgb(2, 48, 49)"
          height="4rem"
          width="4rem"
          textcolor="rgb(2, 48, 49)"
          fontSize="4rem"
        />
      </div>
    );

    return (
      <div data-testid="page-search" className="pageSearch">
        <Header />
        { isLoading ? load : form}
      </div>
    );
  }
}

export default Search;
