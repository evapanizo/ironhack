// Module depedencies
import React, { Component } from 'react';

// Project dependencies
/// Services
import productsServices from '../lib/products-service';

// SearchBar
class SearchBar extends Component {

  state = {
    inputValue: ''
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value
    });
    const { handleSearch } = this.props;
    productsServices.searchByName(event.target.value)
      .then ( (products) => {
        handleSearch(products)
      })
  }

  render () {
    const { inputValue } = this.state;
    return (
      <div className="search-bar">
        <img src={process.env.PUBLIC_URL + '/images/search-icon.png'} 
             alt="Search icon"
             className="search-icon"/>
        <input className="form-control"
               placeholder="Search product" 
               type="text" 
               value={inputValue} 
               onChange={this.handleChange}/>
      </div>  
    )
  }
}

// Export
export default SearchBar;
