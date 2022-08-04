import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    searchData: [],
    artistData: {},
  }

  componentDidMount() {
    this.getAlbumInfo();
  }

  getAlbumInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const musics = data.filter((type) => type.kind === 'song');
    this.setState({ searchData: musics, artistData: data[0] });
  }

  render() {
    const { searchData, artistData } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div className="album">
          <div className="albumDetails">
            <img src={ artistData.artworkUrl100 } alt="capa do album" />
            <div>
              <p data-testid="artist-name">
                { artistData.artistName }
              </p>
              <p data-testid="album-name">
                { artistData.collectionName }
              </p>
            </div>
          </div>
          <div className="albumMusics">
            {searchData.map((music, array) => (
              <MusicCard
                key={ array }
                music={ music }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
