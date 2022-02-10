// Module dependencies
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Project dependencies
/// Services
import authService from '../lib/auth-service';
import boxService from '../lib/box-service';
///Components
import Loader from './Loader';

// CompletedAccount
class CompletedAccount extends Component {

  state = {
    isLoading: true,
    user: null,
    box: null
  }

  componentDidMount () {
    authService.me()
      .then( (user) => {
        boxService.getBox()
        .then( (box) => {
          this.setState({
            user: user,
            box: box,
            isLoading: false
          })
        })
        .catch(error => {
          console.warn(error)
        })
      })
      .catch( (error) => {
        console.warn(error)
      })
  }

  handleRender = () => {
    const { user, box } = this.state;
    const { deliveryAddress } = this.state.user;
    return (
      <div className="account-container">
        <section className="account-info">
          <h2>Account</h2>
          <p><strong>Contact</strong></p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p><strong>Delivery Address</strong></p>
          <p>{`${user.firstName} ${user.lastName}`}</p>
          <p>{`${deliveryAddress.streetAddress} ${deliveryAddress.postalCode} ${deliveryAddress.city}`}</p>
          <p>{`${deliveryAddress.province} ${deliveryAddress.country}`}</p>
          <div className="edit-center-container">
            <Link to='/account/edit' className='btn btn-primary'>Update account</Link>
          </div>
        </section>
        <section className="plan-info">
          <h2>Plan Details</h2>
          <div className="edit-center-container">
          <img 
            src={`${process.env.PUBLIC_URL}/images/${box.size}Box.png`} 
            alt={`${box.size} summary`}
            className="detail-box-img"
            />
            <Link to='/box/change' className='btn btn-primary'>Change Box</Link>
          </div>
          </section>
      </div>
    )
  }

  render () {
    const { isLoading } = this.state;
    return isLoading ? <Loader/> : this.handleRender()
  }
}

// Export
export default withRouter(CompletedAccount);