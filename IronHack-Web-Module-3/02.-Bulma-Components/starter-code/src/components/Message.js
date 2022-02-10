// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Helpers
import types from '../helpers/component-types';

// Message
class Message extends Component {
  
  render() { 
    const {title, className, children} = this.props;
    const classes = ["message"];

    if (className !== undefined) {
      classes.push(className);
    } 
    
    Object.keys(this.props).forEach(item => {
      classes.push(types[item]);
    })

    return (
      <div className={classes.join(" ")}>
        <div className="message-header">
          <p>{title}</p>
          <button className="delete" aria-label="delete"></button>
        </div>
        <div className="message-body">{children}</div>
      </div>
    )
  }
}

// Export
export default Message;