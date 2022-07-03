import React from 'react';
import PropTypes from 'prop-types';

import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInfo: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      albumInfo: musics,
      isLoading: false,
    });
  }

  render() {
    const { albumInfo, isLoading } = this.state;

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
        { isLoading ? loading : <MusicCard albumInfo={ albumInfo } /> }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.required;

export default Album;
