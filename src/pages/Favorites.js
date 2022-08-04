import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import FavoriteCard from '../components/FavoriteCard';

class Favorites extends Component {
  state = {
    favorites: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getFavArray();
  }

  getFavArray = async () => {
    this.setState({ isLoading: true }, async () => {
      const favoritesSongs = await getFavoriteSongs();
      this.setState({ isLoading: false, favorites: favoritesSongs });
    });
  };

  render() {
    const { isLoading, favorites } = this.state;
    return (
      <>
        <Header />
        <br />
        <br />
        <div data-testid="page-favorites" className="albumMusicsPai">
          {isLoading && <Loading />}
          <div className="albumMusics">
            {favorites.map((music, array) => (
              <FavoriteCard
                key={ array }
                music={ music }
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Favorites;
