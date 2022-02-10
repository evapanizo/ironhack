// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Components
import Navbar from './Navbar';
import FormField from './FormField';
import CoolButton from './CoolButton';

// Signup
class Signup extends Component {
  
  render() {
    return (
      <div className="signup">
        <Navbar/>
        <form className="form-container" action="#">
          <FormField label="Name" type="text" placeholder="e.g Alex Smith" />
          <FormField label="Email" type="email" placeholder="e.g. alexsmith@gmail.com" />
          <FormField label="Password" type="password" placeholder="********" />
          <CoolButton isLink className='submit-btn'>Submit</CoolButton>
        </form>
      </div>
    )
  }
}

// Export
export default Signup;