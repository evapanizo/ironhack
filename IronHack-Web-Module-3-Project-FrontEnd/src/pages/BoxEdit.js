// Module dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ListOfProducts from '../components/ListOfProducts';
import ProductCart from '../components/ProductCart';
import Loader from '../components/Loader';
/// Context
import { withAuth } from '../lib/authContext';
/// Service
import boxService from '../lib/box-service';
import productsService from '../lib/products-service';
// Helpers
import helpers from '../helpers/helpers';

class BoxEdit extends Component {

  state = {
    isLoading: true,
    products: null,
    box: null,
    fullBox: false,
    cartIsHidden: true,
    productsInBox: null,
    removed: false,
    updated: false,
  }

  componentDidMount () {
    boxService.getPopulatedBox()
      .then( (result) => {
        const productsInBox = result.products.slice().map( (item) => {
          return {"productId": item.productId._id,
          "productName": item.productId.name,
          "quantity": item.quantity
          }
        });
        boxService.getBox()
          .then( (box) => {
            productsService.getProducts()
            .then ( (products) => {
              this.setState({
                isLoading: false,
                box,
                products,
                productsInBox
              })
            })
          })
      })
      .catch( error => {
        console.warn(error)
        this.setState({
          isLoading: false,
        })
      })
  }

  handleSearch = (products) => {
    this.setState({
      products
    })
  }

  handleAddToBox = (newBoxProduct, productName) => {
    let fullBox;
    let updated = true;
    let removed = false;
    let addedLess = false;
    // Hard copy of box and products in box in the current state
    let box = Object.assign({}, this.state.box);
    box.products = this.state.box.products.slice();
    let productsInBox = this.state.productsInBox.slice();
    // Calculation of the current and future quantity of products in the box
    const currentTotalQuantity = helpers.getTotalQuantityOfProducts(box);
    const futureTotalQuantity = currentTotalQuantity + newBoxProduct.quantity
    // Is the product in the box?
    const index = box.products.map(product => product.productId).indexOf(newBoxProduct.productId)
    
    // If the future quantity of products in the box is greater or equal than the maximum capacity of the box...
    if(futureTotalQuantity >= box.maxQuantity) {
      fullBox = true;
      const leftQuantity = box.maxQuantity-currentTotalQuantity;
      // If the product is not in the box and the box is not full already, then fill the box with the maximum quantity possible of the product. 
      if (index === -1) {
        addedLess = true;
        updated = false;
        newBoxProduct.quantity = Math.round(leftQuantity*100)/100
        box.products.push(newBoxProduct);
        productsInBox.push({...newBoxProduct, productName});
        if(futureTotalQuantity === box.maxQuantity && currentTotalQuantity !== box.maxQuantity) {
          addedLess = false;
          updated = true;
        }
      // If the product is in the box and the box is not full already, then fill the box with the maximum quantity possible of the product. 
      } else {
        addedLess = true;
        updated = false;
        box.products[index].quantity = Math.round((box.products[index].quantity + leftQuantity)*100)/100
        productsInBox[index].quantity = Math.round((productsInBox[index].quantity + leftQuantity)*100)/100
      }
    // If the future quantity of products in the box is lower than the maximum capacity of the box...
    } else {
      fullBox = false;
      // If the product is not in the box...
      if (index === -1) {
        box.products.push(newBoxProduct);
        productsInBox.push({...newBoxProduct, productName});
      // If the product is in the box...
      } else {
        box.products[index].quantity = Math.round((box.products[index].quantity + newBoxProduct.quantity)*100)/100;
        productsInBox[index].quantity = Math.round((productsInBox[index].quantity + newBoxProduct.quantity)*100)/100;
        // If the quantity is lower or equal to zero, remove the product from the box. 
        if(box.products[index].quantity <= 0){
          removed = true;
          updated = false;
          box.products.splice(index, 1)
          productsInBox.splice(index, 1)
        }
      }
    }
    this.setState({
      box,
      fullBox,
      productsInBox,
      updated,
      removed,
      addedLess
    })
  }

  handleClickCart = () => {
    const {cartIsHidden} = this.state;
    this.setState({
      cartIsHidden: !cartIsHidden
    })
  }

  render() {
    const { isLoading, box, products, fullBox, cartIsHidden, productsInBox, removed, updated, addedLess} = this.state;
    const { completedProfile } = this.props.user;
    return isLoading ? <Loader/> : !completedProfile ? <Redirect to='/account'/> : <div className="search-container">
        <Navbar/>
        <section className="add-product-nav">
          <SearchBar handleSearch={this.handleSearch}/>
          <div className="product-cart-logo-container">
            <img type="image" 
                  className="cart-icon" 
                  src={process.env.PUBLIC_URL + `/images/box.png`} 
                  alt={`${box.size} box`}
                  onClick={this.handleClickCart}/>
          </div>
        </section>
        <section className="products-window">
          <ListOfProducts products={products} 
                          box={box} fullBox={fullBox} 
                          handleAddToBox={this.handleAddToBox}
                          removed = {removed}
                          updated = {updated}
                          addedLess = {addedLess}
                          />
        </section>
        <ProductCart cartIsHidden={cartIsHidden} 
                     handleClickCart={this.handleClickCart} 
                     productsInBox={productsInBox} 
                     box={box} 
                     fullBox={fullBox}
          />
      </div>
  }
}

// Export
export default withAuth(BoxEdit);