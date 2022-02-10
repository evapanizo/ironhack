// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Project dependencies
/// Context
import { withAuth } from '../lib/authContext';

// BurgerMenu
class BurgerMenu extends Component {

  state = {
    isVisible: false,
  }

  handleClick = () => {
    const {isVisible} = this.state;
    this.setState({
      isVisible: !isVisible
    })
  }

  render() {
    const {isVisible} = this.state;
    const visible = isVisible ? "open-menu" : "";
    return (
      <div className="burger-menu-container">
        <img src={process.env.PUBLIC_URL + '/images/iconmenu.png'}
             alt="Burger menu icon"
             className="menu-icon"
             onClick={this.handleClick}
             />
        <ul className={`menu ${visible}`}>
          <Link to='/account' className="menu-link">Account</Link> 
          <Link to='/box' className="menu-link">Box</Link>
          <img src={process.env.PUBLIC_URL + '/images/logout-icon.png'}
             alt="Logout icon"
             className="logout-icon"
             onClick={this.props.logout}
             />
        </ul>
      </div>
    )
  }
}

// Export
export default withAuth(BurgerMenu);
