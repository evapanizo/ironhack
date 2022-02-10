// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
import IncompletedAccount from '../components/IncompletedAccount';
import CompletedAccount from '../components/CompletedAccount';

/// Context
import { withAuth } from '../lib/authContext';

// Account
class Account extends Component {

  render() {
    const {completedProfile} = this.props.user;
    return (
      <div>
        <Navbar/>
        {completedProfile ? <CompletedAccount /> : <IncompletedAccount />}
      </div>
    )
  }
}

export default withAuth(Account);