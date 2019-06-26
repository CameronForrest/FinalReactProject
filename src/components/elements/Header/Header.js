import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './Header.css';

const Header = () => {
  return (
    <nav className="nav-wrapper grey darken-4">
      <div className="container">
      <Link to="/">
        <img className="rmdb-logo" src="/images/reactMovie_logo.png" alt="rmdb-logo" />
      </Link>
      <SignedInLinks />
      <SignedOutLinks />
      </div>
    </nav>
  )
  }

export default Header;