import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Form, Input, Button, Icon, Grid, Popup } from 'semantic-ui-react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { parseUrl } from 'query-string'

import './Home.css'
import Header from './Header'
import { shareTwitter, ceilMnutes, interval } from '../tools'

const mapStateToProps = (state) => ({
  ...state
})

class Home extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      playlist: '',
      date: ceilMnutes(new Date(), 5),
      url: '',
      isOpen: false
    }
    this.onPlaylistChange = this.onPlaylistChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onClickCopy = this.onClickCopy.bind(this)
  }

  changeUrl(list, date) {
    if (list) {
      const url = `/lobby?list=${list}&base_time=${date.toJSON()}`
      this.setState({ url: url })
    } else {
      this.setState({ url: '' })
    }
  }

  onPlaylistChange({ target: { value: text }}) {
    const {query: { list: ls }} = parseUrl(text)
    const list = ls? ls : text
    this.setState({ playlist: list })

    const { date } = this.state
    this.changeUrl(list, date)
  }

  onDateChange(date) {
    this.setState({ date: date })

    const { playlist } = this.state
    this.changeUrl(playlist, date)
  }

  onClickCopy() {
    const text = document.getElementById('url')
    text.select()
    document.execCommand('copy')

    this.setState({ isOpen: true })
    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false })
    }, 1000)
  }

  componentDidMount() {
    this.setState({ isLoaded: true })
  }

  render() {
    const { url, playlist, date } = this.state
    const { dispatch } = this.props
    const disable = !url || !playlist 
    return (
      <Grid textAlign='center'>
        <Grid.Column>
          <Header />
          <Form inverted>
            <Form.Input
              label='Playlist URL ( ID will be parsed automatically )'
              onChange={this.onPlaylistChange}
              value={playlist}
              placeholder='Playlist URL'
            />
            <div className='field'>
              <label>Scheduled date</label>
              <DatePicker
                customInput={<Input />}
                selected={date}
                onChange={this.onDateChange}
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={interval}
                dateFormat="MM/dd/yyyy hh:mm aa"
              />
            </div>
            <Form.Input
              label='Created URL'
              disabled={disable}
              id='url'
              value={window.location.origin+url}
            />
            <Popup
              trigger={
                <Button
                  disabled={disable}
                  color='teal'
                >
                  <Icon name='copy' /> Copy URL
                </Button>
              }
              content={(<span>Copied! <Icon fitted color='green' name='check' /></span>)}
              on='click'
              open={this.state.isOpen}
              onOpen={this.onClickCopy}
              position='top right'
            />
            <Button
              disabled={disable}
              color='red'
              onClick={() => dispatch(push(url))}
            >
              <Icon name='play' /> Go to lobby
            </Button>
            <Button
              disabled={disable}
              color='twitter'
              onClick={() => window.open(shareTwitter(url))}
            >
              <Icon name='twitter' /> Share Twitter
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(Home)
