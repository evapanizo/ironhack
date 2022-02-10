// Module dependencies
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

// Project dependencies
///Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';
import AccountComplete from './pages/AccountComplete';
import AccountWelcome from './pages/AccountWelcome';
import AccountEdit from './pages/AccountEdit';
import Box from './pages/Box';
import BoxChange from './pages/BoxChange';
import BoxEdit from './pages/BoxEdit';
import NotFound from './pages/NotFound';
/// Components
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
/// Contexts
import AuthContext from './lib/authContext';

// App
class App extends Component {
  render() {
    return (
      <AuthContext>
        <main className="container">
            <Switch>
              <AnonRoute exact path="/" component={Home} />
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />              
              <PrivateRoute exact path="/account" component={Account} />
              <PrivateRoute path="/account/complete" component={AccountComplete} />
              <PrivateRoute path="/account/welcome" component={AccountWelcome} />
              <PrivateRoute path="/account/edit" component={AccountEdit} />
              <PrivateRoute exact path="/box" component={Box} />
              <PrivateRoute path="/box/change" component={BoxChange} />
              <PrivateRoute path="/box/edit" component={BoxEdit} />
              <Route component={NotFound} />
            </Switch>
        </main>
      </AuthContext>
    )
  }
}

// Export
export default App;
