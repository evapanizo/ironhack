// Module dependencies
import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

// Project dependencies
/// Context
import { withAuth } from '../lib/authContext';

// Anonymous Route
class AnonRoute extends Component {
  render() {
    const {path, component:Component, isLogged, ...rest} = this.props
    return (
      <Route  {...rest } path={path} render={(props)=>{
        return !isLogged ? <Component {...props} /> : <Redirect to={'/account'} />
      }} />
    )
  }
}

// Export
export default withAuth(AnonRoute);