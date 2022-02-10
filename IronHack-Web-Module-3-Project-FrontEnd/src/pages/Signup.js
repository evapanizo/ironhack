// Module dependencies
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
/// Helpers
import helpers from '../helpers/helpers';
/// Services
import auth from '../lib/auth-service';
/// Context
import { withAuth } from '../lib/authContext';

// Signup
class Signup extends Component {

  state = {
    email: '',
    password: '',
    isAlreadyUser: false,
    isEmpty: false
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
    const {setUser} = this.props;

    this.setState({
      isAlreadyUser: false,
      isEmpty: false,
    });
    
    auth.signup({ email, password })
      .then( (user) => {
        this.setState({
            email: '',
            password: '',
        });
        setUser(user);
      })
      .catch( (error) => {
        const {isAlreadyUser, isEmpty} = helpers.handleError(error);
        this.setState({
          email: '',
          password: '',
          isAlreadyUser,
          isEmpty
        });
      });
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleError = () => {
    const { isAlreadyUser , isEmpty} = this.state;
    if(isEmpty){
      return 'Username and/or password are empty'
    } else if (isAlreadyUser) {
      return 'User already registered in the database'
    } else {
      return ''
    }
  }

  render() {
    const { email, password } = this.state;
    const error = this.handleError();
    return (
      <div>
        <Navbar isLogSign/>
          <section className="signup-section">
          <h1 className="enter-title">Create your account</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <input type="email" 
                      className="form-control space-input-3" 
                      name="email" 
                      placeholder="Email" 
                      value={email} 
                      onChange={this.handleChange}
            />  
            </div>
            <div className="form-group">
              <input type="password" 
                      className="form-control" 
                      name="password" 
                      placeholder="Password" 
                      value={password}
                      onChange={this.handleChange} 
            />
            { error ? <p className="error-sms">{error}</p> : <p className="error-sms"></p> }
            </div>
            <input type="submit" value="Sign up" className="btn btn-primary login-btn"/>
            <p className="small-text">Already a user?<Link to='/login' className="primary-link"> Log in</Link></p>
          </form>
        </section>
      </div>
    )
  }
}

// Export
export default withAuth(Signup);