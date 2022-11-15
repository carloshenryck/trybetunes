import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      name: '',
      description: '',
      image: '',
      email: '',
      toRedirect: false,
      isDisabled: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      isLoading: false,
      name: user.name,
      description: user.description,
      image: user.image,
      email: user.email,
    });
  }

  hasToEnableButton = () => {
    const { name, description, image, email } = this.state;
    if (name !== '' && description !== '' && image !== '' && email !== '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { id } = target;

    this.hasToEnableButton();
    this.setState({
      [id]: target.value,
    }, () => {
      this.hasToEnableButton();
    });
  }

  handleSubmit = async () => {
    const { name, description, image, email } = this.state;
    const userObj = {
      name,
      email,
      image,
      description,
    };

    this.setState({ isLoading: true });

    await updateUser(userObj);

    this.setState({
      toRedirect: true,
    });
  }

  renderForm = () => {
    const { isLoading, isDisabled, name, description, image, email } = this.state;

    return (
      <div className="editProfileContainer">
        { isLoading
          ? <Loading />
          : (
            <>
              <label htmlFor="image">
                Perfil:
                <input
                  type="text"
                  id="image"
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }
                  value={ image }
                />
              </label>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  id="name"
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                  required
                  value={ name }
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="text"
                  id="email"
                  data-testid="edit-input-email"
                  onChange={ this.handleChange }
                  required
                  value={ email }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <input
                  type="text"
                  id="description"
                  data-testid="edit-input-description"
                  onChange={ this.handleChange }
                  required
                  value={ description }
                />
              </label>
              <button
                type="submit"
                data-testid="edit-button-save"
                onClick={ this.handleSubmit }
                disabled={ isDisabled }
              >
                Editar Perfil
              </button>
            </>
          )}
      </div>
    );
  }

  render() {
    const { toRedirect } = this.state;

    return (
      <div data-testid="page-profile-edit">
        { toRedirect
          ? <Redirect to="/profile" />
          : (
            <>
              <Header />
              { this.renderForm() }
            </>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
