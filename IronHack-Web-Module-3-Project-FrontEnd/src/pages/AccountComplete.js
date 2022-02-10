// Module dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

/// Context
import { withAuth } from '../lib/authContext';

// Account
class AccountComplete extends Component {

  render() {
    const { completedProfile } = this.props.user;
    return completedProfile ? <Redirect to='/account/welcome'/> : <div>
          <Navbar/>
          <Carousel/> 
        </div>
  }
}

export default withAuth(AccountComplete);