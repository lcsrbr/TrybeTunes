import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class FavoriteCard extends Component {
  state = {
    isLoading: false,
    favorite: true,
  }

  getFavs = () => {
    const { music } = this.props;
    this.setState({ isLoading: true }, async () => {
      await addSong(music);
      this.setState({ isLoading: false });
    });
  }

  removeFavs = () => {
    const { music } = this.props;
    this.setState({ isLoading: true }, async () => {
      await removeSong(music);
      this.setState({ isLoading: false });
    });
  }

  handleChange = ({ target }) => {
    this.setState({ favorite: target.checked });
    const { favorite } = this.state;
    if (favorite) {
      this.removeFavs();
    } else {
      this.getFavs();
    }
  }

  render() {
    const { music } = this.props;
    const { isLoading, favorite } = this.state;
    return (

      <div>
        {isLoading && <Loading />}
        { favorite && (
          <>
            <Link
              data-testid={ `link-to-album-${music.collectionId}` }
              to={ `./album/${music.collectionId}` }
            >
              <img src={ music.artworkUrl100 } alt="capa do album" />
            </Link>
            <div className="musicName">
              <p>
                { music.artistName }
              </p>
              { music.trackName }
            </div>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <br />
            <label
              className="musicFavorite"
              htmlFor={ `checkbox-music-${music.trackId}` }
            >
              <span>Favorita</span>
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${music.trackId}` }
                id={ `checkbox-music-${music.trackId}` }
                onChange={ this.handleChange }
                checked={ favorite }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

FavoriteCard.propTypes = {
  searchData: PropTypes.array,
}.isRequired;

export default FavoriteCard;
