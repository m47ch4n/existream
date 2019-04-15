import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          { this.props.children }
        </header>
      </div>
    );
  }
}

export default App;
