import React, { Component } from 'react'
import Product from '../components/Product';

export default class ListOfProducts extends Component {

  handleAddToBox = (quantity, productId, productName) => {
      // Creation of a newBoxProduct
      quantity = Math.round(100*quantity)/100;
      const newBoxProduct = {
        quantity,
        productId
      }
      const { handleAddToBox } = this.props;
      handleAddToBox(newBoxProduct, productName);
  }

  render() {
    const { products, box, fullBox, updated, removed, addedLess} = this.props;
    const smsClass = addedLess ? 'error-sms parent-sms' : 'ok-sms'
    return <div className="list-products-container">
              <div className="message-bar">
                <p className={`${smsClass}`}>
                  { !updated && !removed && !addedLess ? "Use the + button to add products to your box" : null }
                  {updated ? "Box updated" : null }
                  {removed? "Removed" : null }
                  {addedLess? "There wasn't enough space in the box to fill such quantity. The box is now full." : '' }
                </p>
              </div>
              { products.map( (product) => {
                  return <Product key={product._id} 
                                  box={box} 
                                  product={product} 
                                  fullBox={fullBox} 
                                  handleAddToBox={this.handleAddToBox}
                          />
                })
              }
            </div>
  }
}