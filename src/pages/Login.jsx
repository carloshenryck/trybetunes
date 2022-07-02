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

    return (
      <div>
        { isLoading
          ? <Loading />
          : <Form createNewUser={ this.createNewUser } />}
      </div>
    );
  }
}

Login.propTypes = {
  isLogged: PropTypes.func,
}.required;

export default Login;
