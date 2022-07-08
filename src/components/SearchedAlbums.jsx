import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/searchedAlbums.css';

class Albums extends React.Component {
  render() {
    const { albums, whatISearched } = this.props;

    const albumsElement = (
      <>
        <p className="artistSearched">
          Resultado de álbuns de:
          { ` ${whatISearched}` }
        </p>
        { albums.map((album) => (
          <Link
            to={ `/album/${album.collectionId}` }
            data-testid={ `link-to-album-${album.collectionId}` }
            className="albumCard"
            key={ album.collectionId }
          >
            <img src={ album.artworkUrl100 } alt="album art" className="albumImage" />
            <div className="albumInfo">
              <p className="albumName">{album.collectionName}</p>
              <p className="albumArtist">{album.artistName}</p>
            </div>
          </Link>
        ))}
      </>
    );

    return (
      <div className="albumsContainer">
        { albums.length === 0
          ? <p className="albumNotFind">Nenhum álbum foi encontrado</p>
          : albumsElement}
      </div>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  })),
}.required;

export default Albums;
