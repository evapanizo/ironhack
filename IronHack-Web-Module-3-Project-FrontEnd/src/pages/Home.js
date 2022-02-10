// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';

// Home
class Home extends Component {
  
  render() {
    return (
      <div id="homepage">
        <Navbar className="margin-container" isLogSign={false} />
        <section className="what-is">
          <h1>What is Ugly Veggies?</h1>
          <p className="home-text"> A box full of fruits and vegetables delivered at your door!
          Healty and delicious but sad, as they have been rejected by supermarkets based on looks. 
          Help them feel pretty again!
          </p>
        </section>
        <section className="enter-options">
          <Link to="/signup" className="btn btn-primary giant-btn">Join now</Link>
          <p className="small-text login-text">Already a costumer?
            <Link className="primary-link" to="/login"> Log in</Link>
          </p>
        </section>
      </div>
    )
  }
}

// Export
export default Home;