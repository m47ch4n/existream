import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Statistic, Button, Icon, Grid } from 'semantic-ui-react'
import { parseUrl } from 'query-string'

import Header from './Header'
import actions from '../actions'
import { shareTwitter } from '../tools'

const mapStateToProps = (store) => ({
  ...store.app
})

class Lobby extends Component {
  constructor(props, context) {
    super(props, context)
    const { dispatch } = this.props
    const {query: { list, base_time }} = parseUrl(window.location.href)
    dispatch(actions.fetch({ list, base_time: new Date(base_time) }))
  }

  render() {
    const { isLoaded, url, countdown } = this.props
    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header />
          { countdown?
            <Statistic style={{display: 'block'}} inverted color='grey'>
              <Statistic.Label>Countdown</Statistic.Label>
              <Statistic.Value>{countdown}</Statistic.Value>
            </Statistic>
          : null
          }
          <Button
            disabled={!(isLoaded && url)}
            color='red'
            onClick={() => window.location.href = url}
          >
            <Icon name='play' /> Sync Playlist now!
          </Button>
          <Button
            disabled={!isLoaded}
            color='twitter'
            onClick={() => window.open(shareTwitter(window.location.href))}
          >
            <Icon name='twitter' /> Share Twitter
          </Button>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(Lobby)
