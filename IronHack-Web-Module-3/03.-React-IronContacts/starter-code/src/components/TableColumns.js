// Module dependencies
import React, { Component } from 'react';

// Table Columns
class TableColumns extends Component {

  render() { 
    const {columns} = this.props;
    return (
      <thead>
        <tr> 
          {columns.map((column, index) => <th key={index}>{column}</th>)}
        </tr>
      </thead>
    )
  }
}

// Export
export default TableColumns;
