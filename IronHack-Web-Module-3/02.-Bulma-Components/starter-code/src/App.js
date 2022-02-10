// Module dependencies
import React, { Component } from 'react';

// Project dependencies
/// Components
import Signup from './components/Signup';
import Message from './components/Message';

// App
class App extends Component {
  render() {
    const title = "Reminder";
    return (
      <main>
        <Signup/>
        <Message isInfo className="message-container" title={title}>
          If you already have an account, login!
        </Message>
      </main>
    )
  }
}

// Export
export default App;