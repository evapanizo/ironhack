// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Components
import Contact from './Contact';
import TableColumns from './TableColumns';

// Table
class Table extends Component {

  render() { 
    const {contacts, columns, handleDelete} = this.props
    return (
      <table>
        <TableColumns columns={columns}/>
        <tbody>
          {contacts.map( (contact, index) => 
            <Contact key={index}
                     index={index}
                     contact={contact}
                     handleDelete={handleDelete}/>
          )}
        </tbody>
      </table>
    )
  }
}

// Export
export default Table;
