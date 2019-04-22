import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Container } from 'semantic-ui-react'

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
          <meta name="og:title"       content="existream" />
          <meta name="og:description" content="Synchronize YouTube contents" />
          <meta name="og:url"         content={window.location.href} />
          <meta name="twitter:card"   content="summary" />
          <meta property="og:image"   content="https://existream.netlify.com/logo_1024px.png"/>
        </Helmet>
        <header className="App-header">
          <Container>
            { this.props.children }
          </Container>
        </header>
        <footer className="App-footer">
          <p>Made by <a href="https://www.m47ch4n.net/">m47ch4n</a>.</p>
        </footer>
      </div>
    )
  }
}

export default App
