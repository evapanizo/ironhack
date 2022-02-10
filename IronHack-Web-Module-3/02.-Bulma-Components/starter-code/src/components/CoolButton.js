// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Helpers
import types from '../helpers/component-types';

// Cool Button
class CoolButton extends Component {

  render() { 
    const {className, children} = this.props;
    const classes = ["button"];

    if (className !== undefined) {
      classes.push(className);
    } 

    Object.keys(this.props).forEach(item => {
      classes.push(types[item]);
    })

    return (
      <button className={classes.join(" ")}>{children}</button>
    )
  }
}

// Export
export default CoolButton;
