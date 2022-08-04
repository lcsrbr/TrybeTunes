import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    searchInput: '',
    artistName: '',
    validateSearch: true,
    searchData: [],
    awaitAPI: false,
    searchActive: false,
  }

  getSearchButton = () => {
    const two = 2;
    const { searchInput } = this.state;
    this.setState({ validateSearch: searchInput.length < two });
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    }, this.getSearchButton);
  };

  getSearch = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({ awaitAPI: true, searchActive: true, artistName: searchInput });
    const data = await searchAlbumsAPI(searchInput);
    this.setState({ searchData: data, awaitAPI: false, searchInput: '' });
  }

  render() {
    const { searchInput,
      validateSearch, searchData, awaitAPI, searchActive, artistName } = this.state;
    if (awaitAPI) return <Loading />;

    return (
      <div data-testid="page-search" className="searchDiv">
        <Header />
        <div className="searchInput">
          <label htmlFor="searchInput">
            <br />
            <input
              className="form-control"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
              value={ searchInput }
              id="searchInput"
              name="searchInput"
              type="text"
            />
          </label>
          <p />
          <button
            className="btn btn-success"
            data-testid="search-artist-button"
            id="pesquisar"
            disabled={ validateSearch }
            onClick={ this.getSearch }
            type="submit"
            value="pesquisar"
            name="pesquisar"
          >
            Pesquisar
          </button>
        </div>
        <br />
        { searchData.length > 1 && !awaitAPI
        && (
          <>
            <p className="result fs-3">
              Resultado de álbuns de:
              <br />
              { artistName }
            </p>

            <div className="searchResults">
              <p>
                {searchActive && searchData.length === 0 && 'Nenhum álbum foi encontrado'}
              </p>
              { searchData.map((album) => (
                <div
                  className="albumDiv shadow p-3 bg-transparent mb-5 rounded"
                  key={ album.artistId && album.collectionId }
                >
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `./album/${album.collectionId}` }
                  >
                    <img src={ album.artworkUrl100 } alt="capa do album" />
                    <p>
                      { album.collectionName }
                    </p>
                  </Link>
                </div>
              )) }
            </div>
          </>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Search;
