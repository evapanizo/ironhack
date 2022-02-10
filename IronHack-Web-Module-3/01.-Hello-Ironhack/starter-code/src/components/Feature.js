// Module dependencies
import React, { Component } from 'react';

/// Feature
class Feature extends Component {

  render() {  
    const {title, text, img} = this.props;
    return (
      <article id={title.toLowerCase()}>
        <img src={`${process.env.PUBLIC_URL}/images/${img}`} 
             alt={img}/>
        <h2>{title}</h2>
        <p>{text}</p>
      </article>
    )
  }
}

// Export
export default Feature;
