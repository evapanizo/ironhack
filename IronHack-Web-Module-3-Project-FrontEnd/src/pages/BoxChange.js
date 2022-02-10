// Module dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Project dependencies
///Components
import Navbar from '../components/Navbar';
import BoxForm from '../components/BoxForm';
/// Context
import { withAuth } from '../lib/authContext';

// BoxChange
class BoxChange extends Component {

  render() {
    const {completedProfile} = this.props.user;
    return (
      <div>
        <Navbar/>
        {completedProfile ? <BoxForm/> : <Redirect to='/account'/>}
      </div>
    )
  }
}

export default withAuth(BoxChange);