import React from 'react';
import PropTypes from 'prop-types';

import '../styles/loginLoad.css';
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
    localStorage.removeItem('user');
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
