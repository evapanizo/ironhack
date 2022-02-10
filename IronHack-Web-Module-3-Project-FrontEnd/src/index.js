// Module dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Project dependencies
/// Components
import App from './App';

// Style dependencies
import './index.css';

// Frontend
ReactDOM.render(
  <Router>
    <App />
  </Router>
, document.getElementById('root'));