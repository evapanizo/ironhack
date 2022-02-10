// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// IncompletedAccount
class IncompletedAccount extends Component {
  render() {
    return (
        <div className="incompleted-sms">
          <p>Please, complete your account to access the service options.</p>
          <Link to='/account/complete' className='btn btn-primary'>Complete your account</Link>
      </div>
    )
  }
}

// Export
export default IncompletedAccount;