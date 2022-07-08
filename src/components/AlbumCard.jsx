import React from 'react';
import PropTypes from 'prop-types';

import '../styles/albumCard.css';

class AlbumCard extends React.Component {
  render() {
    const { albumInfo } = this.props;

    return (
      <div className="albumInfoContainer">
        <img src={ albumInfo.artworkUrl100 } alt="album art" />
        <p data-testid="album-name" className="albumName">{ albumInfo.collectionName }</p>
        <p data-testid="artist-name" className="albumArtist">{ albumInfo.artistName }</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albumInfo: PropTypes.object,
}.required;

export default AlbumCard;
