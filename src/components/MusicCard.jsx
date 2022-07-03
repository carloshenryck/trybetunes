import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { albumInfo } = this.props;
    const filterInfo = albumInfo.filter((album) => (
      album.wrapperType !== 'collection' && album.kind === 'song'
    ));

    return (
      <div className="albumContainer">
        <div className="albumInfoContainer">
          <img src={ albumInfo[0].artworkUrl100 } alt="album art" />
          <p data-testid="album-name">{ albumInfo[0].collectionName }</p>
          <p data-testid="artist-name">{ albumInfo[0].artistName }</p>
        </div>
        <div className="musicsContainer">
          { filterInfo.map((info) => (
            <div className="musicWrapper" key={ info.trackId }>
              <p>
                {info.trackName}
              </p>
              <audio data-testid="audio-component" src={ info.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumInfo: PropTypes.array,
}.required;

export default MusicCard;
