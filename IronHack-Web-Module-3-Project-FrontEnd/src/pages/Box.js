
// Module dependencies
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
 
//Project dependencies
/// Components
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
/// Context
import { withAuth } from '../lib/authContext';
/// Service
import boxService from '../lib/box-service';

class Box extends Component {

  state = {
    box: null,
    isLoading: true
  }

  componentDidMount() {
    const { completedProfile } = this.props.user;
    if(completedProfile){
      boxService.getPopulatedBox()
      .then((box) => {
        this.setState({
          isLoading: false,
          box
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        })
        console.warn(error)
      }) 
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    const { completedProfile } = this.props.user;
    const { isLoading, box } = this.state;
    return isLoading ? <Loader/> : <div> 
        {!completedProfile ? <Redirect to='/account' /> : <div className="box-page-container">
            <Navbar/>
            <section className="box-container">
              <h1>Box</h1>
              <div className="box-images-container">
                <img src={`${process.env.PUBLIC_URL}images/${box.size}Box.png`}
                className='box-img'
                alt='Large box logo'
                />
                <Link to='/box/edit'>              
                  <img src={process.env.PUBLIC_URL + '/images/plus.png'}
                  className='add-icon'
                  alt='Add icon'
                  />
                </Link>
              </div>
            </section>
            <section className="products-container">
              <h1>Products</h1>
              { !box.products.length ? <p>Your box is empty!</p> : box.products.map((product) => {
                return <div className="product-container" key={product.productId._id}>
                  <div className="product-image-add">
                    <img src={product.productId.image} alt={`${product.productId.name}`}/>
                 </div>
                 <div className="product-info-add">
                  <p className="product-name-show">{product.productId.name}</p>
                  <p className="product-quantity">{`${product.quantity} kg`}</p>
                </div>
                </div>
                })
              }
            </section>
          </div> 
        }
      </div>
  }
}

export default withAuth(Box);
