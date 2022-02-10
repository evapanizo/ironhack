// Module dependencies
import React, { Component } from 'react';
import { Formik, Field } from 'formik';

// Project dependecies
// Components
import Loader from './Loader';
import helpers from '../helpers/helpers';

class SecondSlide extends Component {

  state = {
    error: null
  }

  handleSubmit = (values) => {
    const { handleSubmit } = this.props;
    const error = helpers.validateUserInfo(values)
    if(error) {
      this.setState({
        error
      })
    } else {
      handleSubmit(values);
    }
  }

  setTransition = () => {
    const {setTransition} = this.props;
    setTransition(1);
  }

  render() {
    const {isLoading} = this.props;
    const {error} = this.state;
    const initialValues = {
      firstName: '',
      lastName: '',
      deliveryAddress: {
        streetAddress: '',
        country: '',
        province: '',
        city: '',
        postalCode: ''
      },
      phone:''
    }
    return isLoading ? <Loader/> : <div className="second-slide">
        <h2>Set up your delivery</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          error={error}
          render={(props) => (
              <form onSubmit={props.handleSubmit}>
                <Field className="form-control space-input" name="firstName" placeholder="First Name"/>
                <Field className="form-control space-input" name="lastName" placeholder="Last Name"/>
                <Field className="form-control space-input" name="phone" type="number" placeholder="Phone"/>
                <Field className="form-control space-input" name="deliveryAddress.streetAddress" placeholder="Street Address"/>
                <Field className="form-control space-input" name="deliveryAddress.country" placeholder="Country"/>
                <Field className="form-control space-input" name="deliveryAddress.province" placeholder="Province/State/Region"/>
                <Field className="form-control space-input" name="deliveryAddress.city" placeholder="City/Town"/>
                <Field className="form-control space-input" name="deliveryAddress.postalCode" type="number" placeholder="Postal Code"/>
                { error ? <p className="error-sms">{error}</p> : <p className="error-sms"></p>}
                <input className="btn btn-primary" type="submit" value="Complete"/>
              </form>
          )}
        />
        <button className='btn slide-arrow-left' onClick={this.setTransition}>{"<"}</button>
        </div>
  }
}

// Export
export default SecondSlide;