import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  store
})

class Lobby extends Component {
  render() {
    return (
      <div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Lobby)
