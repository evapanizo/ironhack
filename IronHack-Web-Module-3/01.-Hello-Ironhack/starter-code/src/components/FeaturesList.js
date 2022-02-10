// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Variables
import features from '../helpers/variables';
/// Components
import Feature from './Feature';

/// Features List
class FeaturesList extends Component {

  render() {  
    return (
      <div className="react-features">
        {features.map((features, index) => 
        <Feature key={index} 
                 title={features.title} 
                 text={features.text} 
                 img={features.img}/>) 
      }
      </div>
    )
  }
}

// Export
export default FeaturesList;
