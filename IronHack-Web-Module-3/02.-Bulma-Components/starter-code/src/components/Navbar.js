// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Components
import CoolButton from './CoolButton';

// Navbar
class Navbar extends Component {

  render() { 
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="bulma-logo"/>
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="#" className="navbar-item">Home</a>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <CoolButton isInfo>Login</CoolButton>
              <CoolButton isPrimary>Signup</CoolButton>  
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

// Export
export default Navbar;
