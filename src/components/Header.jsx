import React from 'react';

import { CgProfile } from 'react-icons/cg';
import '../styles/header.css';
import lightLogo from '../images/lightLogo.svg';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      hasName: false,
    };
  }

  async componentDidMount() {
    const userObj = await getUser();
    const { name } = userObj;
    this.setState({
      name,
      hasName: true,
    });
  }

  render() {
    const { name, hasName } = this.state;

    const header = (
      <div className="userContainer">
        <CgProfile className="profileIcon" />
        <p data-testid="header-user-name">{name}</p>
      </div>
    );

    const loading = (
      <div className="headerLoaderContainer">
        <Loading
          type="spin"
          color="white"
          height="1.2rem"
          width="1.2rem"
          textColor="white"
          fontSize="1.2rem"
        />
      </div>
    );

    return (
      <header data-testid="header-component" className="headerContainer">
        <img src={ lightLogo } alt="trybeTunes logo" className="headerLogo" />
        { hasName ? header : loading}
      </header>
    );
  }
}

export default Header;
