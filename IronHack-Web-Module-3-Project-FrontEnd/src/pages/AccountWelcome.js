// Module dependencies
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';

/// Context
import { withAuth } from '../lib/authContext';

// Account
class AccountWelcome extends Component {

  render() {
    const { completedProfile } = this.props.user;
    return !completedProfile ? <Redirect to='/account'/> : <div>
      <Navbar/>
      <section className="welcome-container">
        <h1>Your profile is completed!</h1>
        <Link to='/box/edit' className="btn btn-primary">Fill your box!</Link>
      </section>
    </div>
  }
}

// Export
export default withAuth(AccountWelcome);
