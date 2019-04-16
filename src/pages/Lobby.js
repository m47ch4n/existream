import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Statistic, Button, Icon, Grid, Header, Image } from 'semantic-ui-react';
import { parseUrl } from 'query-string'
import logo from '../logo.svg';
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
    const disable = !(isLoaded && url)
    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header
            as='h2'
            image
            inverted
            style={{cursor: 'pointer'}}
            onClick={() => window.location.href = '/'}
          >
            <Image src={logo} />
            existream
            <Header.Subheader>Synchronize(Stream) exist playlist on Youtube!</Header.Subheader>
          </Header>
          { countdown?
            <Statistic style={{display: 'block'}} inverted color='grey'>
              <Statistic.Label>Countdown</Statistic.Label>
              <Statistic.Value>{countdown}</Statistic.Value>
            </Statistic>
          : null
          }
          <Button
            disabled={disable}
            color='red'
            onClick={() => window.location.href = url}
          >
            <Icon name='play' /> Sync Playlist now!
          </Button>
          <Button
            disabled={disable}
            color='twitter'
            onClick={() => window.open(shareTwitter())}
          >
            <Icon name='twitter' /> Share Twitter
          </Button>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(Lobby)
