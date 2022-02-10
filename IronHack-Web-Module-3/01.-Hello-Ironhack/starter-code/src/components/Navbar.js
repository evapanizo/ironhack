// Module dependencies
import React, { Component } from 'react';

/// Navbar
class Navbar extends Component {

  render() {  
    return (
      <nav className="nav-bar">
        <div id="logo-container">
          <img src={process.env.PUBLIC_URL + "images/ironhack-logo.svg"} alt="ih-logo"/>
        </div>
        <div id="menu-container">
          <img src={process.env.PUBLIC_URL + "images/menu-top.svg"} alt="burger"/>
        </div>
      </nav>
    )
  }
}

// Export
export default Navbar;
