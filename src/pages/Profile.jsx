import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading
          ? <Loading />
          : (
            <>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.description}</div>
              <img src={ user.image } alt="user profile" data-testid="profile-image" />
              <Link to="/profile/edit"> Editar perfil </Link>
            </>
          )}
      </div>
    );
  }
}

export default Profile;
