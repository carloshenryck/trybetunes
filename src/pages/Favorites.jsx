import React from 'react';

import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

import '../styles/favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.updateFavorites();
  }

  updateFavorites = async () => {
    this.setState({ isLoading: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
      isLoading: false,
    });
  }

  render() {
    const { favorites, isLoading } = this.state;

    const loading = (
      <div className="loginLoad">
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
      <div data-testid="page-favorites" className="favoritePage">
        <Header />
        <div className="favoritesContainer">
          { isLoading
            ? loading
            : (
              <>
                {favorites.map((favorite) => (
                  <MusicCard
                    track={ favorite }
                    key={ favorite.trackId }
                    isFavorite
                    updateFavorites={ this.updateFavorites }
                  />
                ))}
              </>
            )}
        </div>
      </div>
    );
  }
}

export default Favorites;
