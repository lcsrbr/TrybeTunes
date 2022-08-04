import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    favorite: false,
    favorites: [],
  }

  componentDidMount() {
    this.getFavArray();
  }

getFavArray = async () => {
  const favoritesSongs = await getFavoriteSongs();
  this.setState({ favorites: favoritesSongs });
  const { music } = this.props;
  const { favorites } = this.state;
  const bool = favorites.some((track) => track.trackId === music.trackId);
  this.setState({ favorite: bool });
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
      <div className="musicName">
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
    </div>
  );
}
}

MusicCard.propTypes = {
  searchData: PropTypes.array,
}.isRequired;

export default MusicCard;
