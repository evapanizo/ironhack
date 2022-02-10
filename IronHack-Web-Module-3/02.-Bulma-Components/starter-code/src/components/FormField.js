// Module dependencies
import React, { Component } from 'react';

// FormField
class FormField extends Component {

  render() {  
    const {label, type, placeholder} = this.props;
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input className="input" type={type} placeholder={placeholder}/>
        </div>
      </div>
    )
  }
}

// Export
export default FormField;
