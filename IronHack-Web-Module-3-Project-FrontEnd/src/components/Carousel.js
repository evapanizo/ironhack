// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Project dependencies
/// Components
import Slide from './Slide';

// Carousel
class Carousel extends Component {

  state = {
    transition: 1,
  }

  setTransition = (transition) => {
    this.setState({
      transition
    })
  }

  render() {
    const { transition } = this.state;
    const transitionOne = transition === 1 ? 'transition-1' : '';
    const transitionTwo = transition === 2 ? 'transition-2' : '';
    return (
      <div className='carousel-container'>
        <nav className="carousel-nav">
          <span className='dot' id={transitionOne}></span>
          <span className='dot' id={transitionTwo}></span>
          <Link to="/account" className="close">X</Link>
        </nav>
        <Slide transition={transition} setTransition={this.setTransition}/>
      </div>
    )
  }
}

// Export
export default Carousel;
