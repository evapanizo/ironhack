// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
// Helpers
import helpers from '../helpers/helpers';
/// Context
import { withAuth } from '../lib/authContext';

// Login
class Login extends Component {

  state = {
    email: '',
    password: '',
    isErrorEmailPassword: false,
    isEmpty: false
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const {setUser} = this.props;

    this.setState({
      isErrorEmailPassword: false,
      isEmpty: false,
    });

    auth.login({ email, password })
    .then( (user) => {
      this.setState({
        email: '',
        password: '',
      });
      setUser(user);
    })
    .catch( (error) => {
      const {isErrorEmailPassword, isEmpty} = helpers.handleError(error);
      this.setState({
        email: '',
        password: '',
        isErrorEmailPassword, 
        isEmpty
      })
    });
  }

  handleError = () => {
    const {isErrorEmailPassword, isEmpty} = this.state;
    if(isEmpty){
      return 'Username and/or password are empty'
    } else if (isErrorEmailPassword) {
      return 'Username and/or password are invalid'
    } else {
      return ''
    }
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { email, password } = this.state;
    const error = this.handleError();
    return (
      <div>
        <Navbar isLogSign/>
        <section className="login-section">
          <h1 className="enter-title">Welcome back!</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <input type="email" 
                    className="form-control space-input-3" 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={this.handleChange}/>
            </div>
            <div className="form-group">
            <input type="password" 
                  className="form-control"  
                  name="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={this.handleChange}/>
            { error ? <p className="error-sms">{error}</p> : <p className="error-sms"></p> }
            </div>
            <input type="submit" value="Log in" className="btn btn-primary login-btn"/>
          </form>
          <p className="small-text">Are you new?<Link to='/signup' className="primary-link"> Sign up</Link></p>
          <Link to='/' className="small-text primary-link">Forgot your password?</Link>
        </section>
        </div>
    )
  }
}

// Export
export default withAuth(Login);