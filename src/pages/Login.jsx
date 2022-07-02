import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';
import Form from '../components/Form';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    sessionStorage.removeItem('name');
  }

  createNewUser = (name) => {
    const { isLogged } = this.props;

    this.setState({
      isLoading: true,
    }, () => {
      createUser({ name }).then(() => isLogged());
    });
  }

  render() {
    const { isLoading } = this.state;
    const loading = (
      <Loading
        type="bubbles"
        color="black"
        height="10rem"
        width="10rem"
        textcolor="black"
        fontSize="2rem"
      />
    );

    return (
      <div>
        { isLoading
          ? loading
          : <Form createNewUser={ this.createNewUser } />}
      </div>
    );
  }
}

Login.propTypes = {
  isLogged: PropTypes.func,
}.required;

export default Login;
