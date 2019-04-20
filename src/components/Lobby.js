import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Statistic, Button, Icon, Grid, Container } from 'semantic-ui-react'
import { parseUrl } from 'query-string'

import './Lobby.css'
import Header from './Header'
import VideoCard from './VideoCard'
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
    const { isLoaded, url, countdown, video, video_index, playlist, time } = this.props
    return (
      <Grid textAlign='center'>
        <Grid.Column>
          <Header />
          { countdown?
            <Statistic style={{display: 'block'}} inverted color='grey'>
              <Statistic.Label>Countdown</Statistic.Label>
              <Statistic.Value>{countdown}</Statistic.Value>
            </Statistic>
          : null
          }
          { video?
            <Container>
              <h2>Now Playing</h2>
              <VideoCard
                video={video}
                video_index={video_index}
                videos={playlist.length}
                time={time}
              />
            </Container>
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
