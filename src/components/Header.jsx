import React from 'react';
import { NavLink } from 'react-router-dom';

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

  // implementar session storage
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
          height="2rem"
          width="2rem"
          textcolor="white"
          fontSize="1.2rem"
        />
      </div>
    );

    return (
      <header data-testid="header-component">
        <div className="headerContainer">
          <img src={ lightLogo } alt="trybeTunes logo" className="headerLogo" />
          { hasName ? header : loading}
        </div>
        <div className="linkContainer">
          <NavLink
            to="/search"
            data-testid="link-to-search"
            className="linkRoute"
            activeClassName="activeLinkRoute"
            onClick={ this.changeLinkStyle }
          >
            Search
          </NavLink>
          <NavLink
            to="/favorites"
            data-testid="link-to-favorites"
            className="linkRoute"
            activeClassName="activeLinkRoute"
            onClick={ this.changeLinkStyle }
          >
            Favorites
          </NavLink>
          <NavLink
            to="/profile"
            data-testid="link-to-profile"
            className="linkRoute"
            activeClassName="activeLinkRoute"
            onClick={ this.changeLinkStyle }
          >
            Profile
          </NavLink>
        </div>
      </header>
    );
  }
}

export default Header;
