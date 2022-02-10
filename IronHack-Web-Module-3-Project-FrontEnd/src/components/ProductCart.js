// Module dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Project dependencies
// Context
import { withAuth } from '../lib/authContext';
/// Services
import boxService from '../lib/box-service';
import authService from '../lib/auth-service';
/// Helpers
import helpers from '../helpers/helpers';

class ProductCart extends Component {

  handleUpdate = (event) => {
    event.preventDefault();
    const { productsInBox, box} = this.props;
    const products = productsInBox.map((product) => {
      return {'quantity': product.quantity, 'productId': product.productId }
    })
    box.products = products;
    boxService.editBox(box)
      .then(()=> {
        this.props.history.push('/box');
      })
      .catch((error) => {
        console.warn(error)
      })
  }

  handleCheckout = (event) => {
    event.preventDefault();
    const { productsInBox, box, setUser} = this.props;
    const products = productsInBox.map((product) => {
      return {'quantity': product.quantity, 'productId': product.productId }
    })
    box.products = products;
    boxService.editBox(box)
      .then(()=> {
        authService.updatePayment({payment: 'true'})
          .then( (user) => {
            setUser(user);
            this.props.history.push('/box');
          })
          .catch( (error) => console.warn(error))
      })
      .catch((error) => console.warn(error))
  }
  
  render() {
    const { productsInBox, fullBox, cartIsHidden, handleClickCart, user, box} = this.props;
    const openCart = cartIsHidden ? '' : 'open-cart';
    return !productsInBox.length ? <div className={`cart-container ${openCart}`}>
        <p className="close" onClick={handleClickCart}>X</p>
        <p className="empty-box">Your box is empty!</p>
      </div> : <div className={`cart-container ${openCart}`}>
      <nav>
        <p className="close" onClick={handleClickCart}>X</p>
      </nav>
      <section className="cart-summary">
        <h2 className="cart-title">Your products</h2>
        {productsInBox.map((product) => {
          return <p key={product.productId}>{`${product.productName} x ${product.quantity} kg`}</p>
        })}
        <p className="total">Total: {helpers.getTotalQuantityOfProducts(box)} kg</p>
        { fullBox ? <p className="error-sms">Your box is full!</p> : null}
      </section>
      <section className="checkout">
        { user.payment ? <form onSubmit={this.handleUpdate}>
            <input className="btn btn-primary" type="submit" value="update"/>
          </form> : <form onSubmit={this.handleCheckout}>
            <input className="btn btn-primary" type="submit" value="checkout"/>
          </form>
        }
      </section>
    </div>
  }
}

// Export
export default withRouter(withAuth(ProductCart));
