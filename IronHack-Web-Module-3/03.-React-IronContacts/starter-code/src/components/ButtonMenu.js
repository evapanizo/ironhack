// Module dependencies
import React, { Component } from 'react';

// ButtonMenu
class ButtonMenu extends Component {

  handleAddRandom = () => {
    const {contactsList} = this.props;
    if(contactsList.length > 0) {
      const {contacts, handleState} = this.props;
      const index = Math.floor(Math.random() * contactsList.length)
      contacts.push(contactsList[index])
      contactsList.splice(index,1);
      handleState({contacts: contacts, contactsList: contactsList})
    }
  }

  handleSort = (event) => {
    const type = event.target.textContent === 'Sort By Name' ? 'name' : 'popularity'
    const {contacts, handleState, contactsList} = this.props;
    const sorted = contacts.sort( (a, b) => {
      if (a[type] < b[type]) {
        return type === 'name' ? -1 : 1;
      }
      if (a[type] > b[type]) {
        return type === 'name' ? 1 : -1;
      }
      return 0;
    });
    handleState({contacts: sorted, contactsList: contactsList})
  }

  render() { 
    const {handleAddRandom, handleSort} = this;
    return (
      <div className='btn-menu'>
        <button className='btn' onClick={handleAddRandom}>Add Random Contact</button>
        <button className='btn' onClick={handleSort}>Sort By Name</button>
        <button className='btn' onClick={handleSort}>Sort By Popularity</button>
      </div>
    )
  }
}

// Export
export default ButtonMenu;
