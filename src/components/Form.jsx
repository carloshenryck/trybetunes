import React from 'react';
import PropTypes from 'prop-types';

import '../styles/form.css';
import logo from '../trybeTunes.svg';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
    };
  }

  canButtonBeActivated = () => {
    const { name } = this.state;
    const minChar = 3;
    const isDisabled = name.length < minChar;

    this.setState({
      isDisabled,
    });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    }, this.canButtonBeActivated);
  }

  render() {
    const { name, isDisabled } = this.state;
    const { createNewUser } = this.props;

    return (
      <div data-testid="page-login" className="loginContainer">
        <img src={ logo } alt="trybeTunes logo" className="logo" />

        <div className="formWrapper">
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Nome"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ () => createNewUser(name) }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  createNewUser: PropTypes.func,
}.required;

export default Form;
