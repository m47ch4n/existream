import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Grid } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css"
import { parseUrl } from 'query-string'

import './Home.css'
import Header from './Header'
import UrlInput from './UrlInput'
import DatePickButton from './DatePickButton'
import WatchCheckbox from './WatchCheckbox'
import UrlOutput from './UrlOutput'
import LobbyButton from './LobbyButton'
import TwitterButton from './TwitterButton'
import { ceilMnutes } from '../tools'

const mapStateToProps = (state) => ({
  ...state
})

class Home extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      list_id: '',
      video_id: '',
      date: ceilMnutes(new Date()),
      url: '',
      watch: false
    }
    this.onIdChange = this.onIdChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onClickCopy = this.onClickCopy.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  changeUrl({ video_id, list_id }, date, watch) {
    if (video_id) {
      const url = `/lobby?video_id=${video_id}&base_time=${date.toJSON()}&watch=${watch}`
      this.setState({ url: url })
    } else if (list_id) {
      const url = `/lobby?list_id=${list_id}&base_time=${date.toJSON()}&watch=${watch}`
      this.setState({ url: url })
    } else {
      this.setState({ url: '' })
    }
  }

  onIdChange({ target: { value: text }}) {
    const {query: { v: video_id, list: list_id }} = parseUrl(text)
    // priority: video_id > list_id
    if (video_id) {
      this.setState({ video_id: video_id, list_id: '' })
      const { date, watch } = this.state
      this.changeUrl({ video_id }, date, watch)
    } else if (list_id) {
      this.setState({ video_id: '', list_id: list_id })
      const { date, watch } = this.state
      this.changeUrl({ list_id }, date, watch)
    } else {
      this.setState({ video_id: '', list_id: '' })
      this.changeUrl({}, null, null)
    }
  }

  onDateChange(date) {
    this.setState({ date: date })

    const { video_id, list_id } = this.state
    this.changeUrl({ video_id, list_id }, date)
  }

  onClickCopy() {
    const text = document.getElementById('url')
    text.select()
    document.execCommand('copy')
  }

  componentDidMount() {
    this.setState({ isLoaded: true })
  }

  toggle() {
    const next = !this.state.watch
    this.setState({ watch: next })
    const { video_id, list_id, date } = this.state
    this.changeUrl({ video_id, list_id }, date, next)
  }

  render() {
    const { url, video_id, list_id, date, watch } = this.state
    const id = video_id ? video_id : list_id ? list_id : ''
    const { dispatch } = this.props
    const disable = !url || !id
    const out_url = window.location.host+url
    return (
      <Grid textAlign='center'>
        <Grid.Column>
          <Header />
          <UrlInput value={id} onChange={this.onIdChange} />
          <DatePickButton selected={date} onChange={this.onDateChange} />
          <UrlOutput onClick={this.onClickCopy} disabled={disable} value={out_url} />
          <WatchCheckbox onChange={this.toggle} checked={watch} />
          <LobbyButton disabled={disable} onClick={() => dispatch(push(url))} />
          <TwitterButton disabled={disable} url={window.location.origin+url} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(Home)
