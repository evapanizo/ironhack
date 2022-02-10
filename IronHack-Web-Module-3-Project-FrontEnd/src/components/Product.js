// Module dependencies
import React, { Component } from 'react';

// Product;
class Product extends Component {
  
  state = {
    inputValue: '',
    isEmpty: false,
    isNegative: false,
    isFull: false
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {inputValue} = this.state;
    const { fullBox } = this.props;
    // If Box is full and input value is greater than 0, then BOX IS FULL ERROR.
    if(fullBox && inputValue > 0) {
      return this.setState({
        isEmpty: false,
        isNegative: false,
        isFull: true,
        inputValue: '',
      }) 
    }
    // If quantities are empty, then EMPTY ERROR.
    if (!inputValue || inputValue === '0') {
      return this.setState({
        isEmpty: true,
        isNegative: false,
        isFull: false,
        inputValue: '',
      })
    } 
    const {product, handleAddToBox, box} = this.props;
    const index = box.products.map(product => product.productId).indexOf(product._id)
    // If the product is not in the box and user introduces a negative value, NOT IN CART ERROR. 
    if( index === -1 && inputValue < 0 ) {
      return this.setState({
        isEmpty: false,
        isNegative: true,
        isFull: false,
        inputValue: '',
      })
    // Else, pass the input value to List of Products component. 
    } else {
      handleAddToBox(parseFloat(Math.round(100*inputValue)/100), product._id, product.name)
      return this.setState({
        inputValue: '',
        isEmpty: false,
        isNegative: false,
      })
    }
  }

  render() {
    const { product } = this.props;
    const { inputValue, isEmpty, isNegative, isFull} = this.state;
    return (
      <article className='product-container'>
        <div className="product-image-add">
          <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={`${product.name}`}/>
        </div>
        <div className="product-info-add">
          <p className="product-text">{product.name}</p>
          <form onSubmit={this.handleSubmit}>
            <input className="form-control input-product" type="number" value={inputValue} placeholder='kg' onChange={this.handleChange}/>
            <p className="error-sms product-text">
              {isEmpty ? 'Empty': null }
              {isNegative ? "Not in cart" : null }
              {isFull ? "Box is full" : null }
            </p>
            <input type="image" 
            src={process.env.PUBLIC_URL + '/images/plus.png'}
            className='add-icon-product'
            alt={`${product.name}`}/>
          </form>
        </div>
      </article>
    )
  }
}

// Export
export default Product;