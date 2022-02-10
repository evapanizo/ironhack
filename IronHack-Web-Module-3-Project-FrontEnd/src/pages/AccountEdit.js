// Module dependencies
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Formik, Field } from 'formik';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
/// Context
import { withAuth } from '../lib/authContext';
// Services
import authService from '../lib/auth-service';
// Helpers
import helpers from '../helpers/helpers';

// AccountEdit
class AccountEdit extends Component {

  state = {
      isLoading: true,
      firstName: '',
      lastName: '',
      deliveryAddress: '',
      phone: '',
      error: null
  }

  handleSubmit = (values) => {
    const error = helpers.validateUserInfo(values);
    if(error) {
      this.setState({
        error
      })
    } else {
      values['completedProfile'] = true;
      const {setUser} = this.props;
      authService.updateUser(values)
      .then( (updatedUser) => {
        setUser(updatedUser);
        this.props.history.push('/account')
      })
     .catch((error) => {
      console.warn(error)
      });  
    }
  }

  componentDidMount(){
    authService.me()
    .then( (user) => {
      const { firstName, lastName, deliveryAddress, phone } = user;
      this.setState({
        firstName,
        lastName,
        deliveryAddress,
        phone,
        isLoading: false
      })
    })
    .catch( (error) => {
      console.warn(error)
    })
  }

  handleEdit = () => {
    const { firstName, lastName, deliveryAddress, phone, error } = this.state;
    const initialValues = {firstName, lastName, deliveryAddress, phone};
    return (
      <div className="edit-account-container">
        <h2>Edit your account details</h2>
        <Formik initialValues={initialValues}
          onSubmit={this.handleSubmit}
          render={(props) => (
              <form onSubmit={props.handleSubmit}>
                <label><strong>First Name</strong></label>
                <Field className="form-control space-input-2" name="firstName" placeholder="First Name"/>
                <label><strong>Last Name</strong></label>
                <Field className="form-control space-input-2" name="lastName" placeholder="Last Name"/>
                <label><strong>Phone</strong></label>
                <Field className="form-control space-input-2" name="phone" type="number" placeholder="Phone"/>
                <label><strong>Delivery Address</strong></label>
                <Field className="form-control space-input-2" name="deliveryAddress.streetAddress" placeholder="Street Address"/>
                <Field className="form-control space-input-2" name="deliveryAddress.country" placeholder="Country"/>
                <Field className="form-control space-input-2" name="deliveryAddress.province" placeholder="Province/State/Region"/>
                <Field className="form-control space-input-2" name="deliveryAddress.city" placeholder="City/Town"/>
                <Field className="form-control space-input-4" name="deliveryAddress.postalCode" type="number" placeholder="Postal Code"/>
                { error ? <p className="error-sms">{error}</p> : <p className="error-sms"></p>}
                <input className="btn btn-primary" type="submit" value="Update"/>
              </form>
          )}
        />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state;
    const {completedProfile} = this.props.user;
    return isLoading ? <Loader/> : <div>
        <Navbar/>
        {completedProfile ? this.handleEdit() : <Redirect to='/account'/>}
      </div>
  }
}

export default withRouter(withAuth(AccountEdit));