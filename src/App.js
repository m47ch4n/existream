import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import './App.css'

class App extends Component {
  componentWillMount() {
    window.prerenderReady = false
  }
  componentDidMount() {
    window.prerenderReady = true
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <meta name="og:title" content="existream" />
          <meta name="og:description" content="Synchronize YouTube contents" />
          <meta name="og:url" content={window.location.href} />
          <meta name="twitter:card" content="summary" />
        </Helmet>
        <header className="App-header">
          { this.props.children }
        </header>
      </div>
    )
  }
}

export default App
