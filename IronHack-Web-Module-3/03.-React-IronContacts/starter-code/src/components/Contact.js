// Module dependencies
import React, { Component } from 'react';

// Contact
class Contact extends Component {

  handleDelete = () => {
    const {index, handleDelete} = this.props;
    handleDelete(index);
  }

  render() { 
    const {name, pictureUrl} = this.props.contact
    const popularity = Math.round(this.props.contact.popularity * 100) / 100
    const {handleDelete} = this
    return (
      <tr>
        <td><img src={pictureUrl} alt={name} className='contact-img'/></td>
        <td>{name}</td> 
        <td>{popularity}</td>
        <td><button className='btn btn-delete' onClick={handleDelete}>Delete</button></td>
      </tr>
    )
  }
}

// Export
export default Contact;
