import React from 'react';
import PropTypes from 'prop-types';

import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      favoriteSongs: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      album: musics,
    }, this.favoriteSongs);
  }

  favoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs }, () => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { album, isLoading, favoriteSongs } = this.state;
    const [albumInfo, ...tracks] = album;

    const loading = (
      <div className="albumLoad">
        <Loading
          type="bubbles"
          color="black"
          height="10rem"
          width="10rem"
          textcolor="black"
          fontSize="2rem"
        />
      </div>
    );

    return (
      <div data-testid="page-album">
        <Header />
        { isLoading
          ? loading
          : (
            <>
              <AlbumCard albumInfo={ albumInfo } />
              {tracks.map((track) => (
                <MusicCard
                  track={ track }
                  key={ track.trackId }
                  isFavorite={
                    favoriteSongs.find((song) => song.trackId === track.trackId)
                  }
                />
              ))}
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.required;

export default Album;
