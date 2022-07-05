import React from 'react';
import PropTypes from 'prop-types';

import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({ isFavorite });
  }

  setFavorite = async () => {
    const { track } = this.props;
    this.setState({ isLoading: true });
    await addSong(track);
    this.setState({
      isLoading: false,
      isFavorite: true,
    });
  }

  render() {
    const { track } = this.props;
    const { isLoading, isFavorite } = this.state;

    const albumContainer = (
      <div className="musicsContainer">
        <div className="musicWrapper">
          <p>
            {track.trackName}
          </p>
          <audio data-testid="audio-component" src={ track.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ track.trackId }>
            <span>Favorita</span>
            <input
              type="checkbox"
              id={ track.trackId }
              checked={ isFavorite }
              onChange={ this.setFavorite }
              data-testid={ `checkbox-music-${track.trackId}` }
            />
          </label>
        </div>
      </div>
    );

    const loading = (
      <Loading
        type="spin"
        color="black"
        height="2rem"
        width="2rem"
        textcolor="black"
        fontSize="1.2rem"
      />
    );

    return (
      <div className="albumContainer">
        { isLoading ? loading : albumContainer }
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.object,
  favorites: PropTypes.array,
  updateFavorites: PropTypes.func,
}.required;

export default MusicCard;
