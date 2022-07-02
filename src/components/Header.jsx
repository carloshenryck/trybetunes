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
    if (sessionStorage.getItem('name') !== null) {
      this.setState({
        name: sessionStorage.getItem('name'),
        hasName: true,
      });
    }

    const userObj = await getUser();
    const { name } = userObj;
    this.setState({
      name,
      hasName: true,
    }, () => {
      const { name: userName } = this.state;
      sessionStorage.setItem('name', userName);
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
