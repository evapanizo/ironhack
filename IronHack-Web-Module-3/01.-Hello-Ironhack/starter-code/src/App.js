// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Components
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import FeaturesList from './components/FeaturesList';

// App
class App extends Component {

  render() {
    return (
      <main>
        <Navbar/>
        <Welcome/>
        <FeaturesList/>
      </main>
    )
  }
}

// Export
export default App;
