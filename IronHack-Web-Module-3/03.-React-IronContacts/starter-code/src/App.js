// Module dependencies
import React, { Component } from 'react';
import listOfContacts from './data/contacts.json';

// Project dependencies
/// Components
import Table from './components/Table';
import ButtonMenu from './components/ButtonMenu';

// App
class App extends Component {

  state = {
    contacts: listOfContacts.slice(0,5),
    contactsList: listOfContacts.slice(5)
  }

  handleState = newState => {
    const {contacts, contactsList} = newState;
    this.setState({
      contacts: contacts,
      contactsList: contactsList
    });
  }

  handleDelete = index => {
    const {contacts, contactsList} = this.state;
    contactsList.push(contacts[index])
    contacts.splice(index,1);
    this.setState({
      contacts: contacts,
      contactsList: contactsList
    });
  }

  render() {
    const columns = ['Picture', 'Name', 'Popularity', 'Action']
    const {contacts, contactsList} = this.state;
    const {handleState, handleDelete} = this;
    return (
      <main>
        <h1>IronContacts</h1>
        <ButtonMenu contacts={contacts} 
                    contactsList={contactsList} 
                    handleState={handleState}/>
        <Table contacts={contacts} 
               contactsList={contactsList} 
               columns={columns} 
               handleDelete={handleDelete}/>
      </main>
    )
  }
}

// Export
export default App;