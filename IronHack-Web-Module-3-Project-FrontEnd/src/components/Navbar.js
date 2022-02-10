// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Project dependencies
/// Components
import BurgerMenu from './BurgerMenu';

/// Context
import { withAuth } from '../lib/authContext';

/// Navbar
class Navbar extends Component {

  render() {  
    const {isLogged} = this.props;
    const companyLogo = !isLogged ? '' : 'nav-logo'
    const logoContainer = !isLogged ? 'logo-container' : ''
    return (
      <nav className="nav-bar">
        <div className={logoContainer}>
          <Link to='/'>
            <img src={process.env.PUBLIC_URL + '/images/ugly-veggies.png'} 
             className={companyLogo}
             alt="Ugly Veggie Logo"/>
          </Link>
        </div>
        {isLogged ? <BurgerMenu/> : null}
      </nav>
    )
  }
}

// Export
export default withAuth(Navbar);
