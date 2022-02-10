// Module dependencies
import React, { Component } from 'react'

// Not Found
class NotFound extends Component {
  render() {
    return (
      <div className="error-container">
        <h1 id="error-404-title">ERROR 404</h1>
        <p id="error-404-text">Page Not Found</p>
        <img id="error-404-img" src={process.env.PUBLIC_URL + '/images/sad-vegetables.png'}  alt="Group of sad vegetables"/>
      </div>
    )
  }
}

// Export
export default NotFound;