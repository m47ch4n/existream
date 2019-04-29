import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Grid } from 'semantic-ui-react'
import { parseUrl } from 'query-string'

import './Lobby.css'
import Header from './Header'
import CountDown from './CountDown'
import VideoCard from './VideoCard'
import Viewer from './Viewer'
import OffsetButton from './OffsetButton'
import ControlButton from './ControlButton'
import YouTubeButton from './YouTubeButton'
import TwitterButton from './TwitterButton'
import actions from '../actions'

const mapStateToProps = (store) => ({
  ...store.app
})

class Lobby extends Component {
  constructor(props, context) {
    super(props, context)
    const { dispatch } = this.props
    const {query: { video_id, list_id, base_time, watch }} = parseUrl(window.location.href)
    dispatch(actions.fetch({ video_id, list_id, base_time: new Date(base_time), watch: JSON.parse(watch) }))
    this.onChangeOffset = this.onChangeOffset.bind(this)
    this.syncVideo = this.syncVideo.bind(this)
    this.closeVideo = this.closeVideo.bind(this)
  }

  syncVideo() {
    this.props.dispatch(actions.syncVideo(true))
  }

  closeVideo() {
    this.props.dispatch(actions.closeVideo())
  }

  onChangeOffset(e) {
    const value = parseInt(e.target.value)
    const offset = value >= 0 ? value <= 10 ? value : 10 : 0
    this.props.dispatch(actions.changeOffset(offset))
  }

  render() {
    const { isLoaded, url, countdown, video, video_index, playlist,
      time, offset, play_video, play_time, watch, dispatch } = this.props
    return (
      <Grid textAlign='center'>
        <Grid.Column>
          <Header onClick={() => dispatch(push('/'))} />
          <CountDown countdown={countdown} />
          <VideoCard
            video={video}
            video_index={video_index}
            videos={playlist.length}
            time={time}
          />
          <Viewer
            watch={watch}
            video={play_video}
            start={play_time}
            syncVideo={() => this.syncVideo()}
          />
          <OffsetButton value={offset} onChange={this.onChangeOffset} />
          <ControlButton
            closeVideo={() => this.closeVideo()}
            syncVideo={() => this.syncVideo()}
            play_video={play_video}
            watch={watch}
          />
          <YouTubeButton href={url} disabled={!(isLoaded && url)} />
          <TwitterButton disabled={!isLoaded} url={window.location.href} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(Lobby)
