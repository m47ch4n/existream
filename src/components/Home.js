import React, { Component } from 'react'
import { Form, Input, Button, Icon, Grid } from 'semantic-ui-react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { parseUrl } from 'query-string'

import Header from './Header'
import { shareTwitter } from '../tools'

const ceilMnutes = (date, interval) => {
  const minutes = date.getMinutes()
  const newMinutes = interval * Math.ceil(minutes / interval)
  date.setMinutes(newMinutes)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

class Home extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      playlist: '',
      date: ceilMnutes(new Date(), 5),
      url: ''
    }
    this.onPlaylistChange = this.onPlaylistChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
  }

  onPlaylistChange({ target: { value: text }}) {
    const {query: { list: ls }} = parseUrl(text)
    const list = ls? ls : text
    this.setState({ playlist: list })

    const { date } = this.state
    const { origin } = window.location
    if (text) {
      const url = `${origin}/lobby?list=${list}&base_time=${date.toJSON()}`
      this.setState({ url: url })
    } else {
      this.setState({ url: '' })
    }
  }

  onDateChange(date) {
    this.setState({ date: date })
    const { playlist } = this.state
    const { origin } = window.location
    const url = `${origin}/lobby?list=${playlist}&base_time=${date.toJSON()}`
    this.setState({ url: url })
  }

  onClickCopy() {
    const text = document.getElementById('url')
    text.select()
    document.execCommand('copy')
  }

  render() {
    const { url, playlist, date } = this.state
    const disable = !url || !playlist 
    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header />
          <Form>
            <Form.Input
              onChange={this.onPlaylistChange}
              value={playlist}
              placeholder='Playlist URL'
            />
            <div className='field'>
              <DatePicker
                selected={date}
                onChange={this.onDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                inline
              />
            </div>
            <Input
              disabled={disable}
              id='url'
              fluid
              size='small'
              value={url}
              className='field'
            />
            <Button
              disabled={disable}
              color='teal'
              onClick={this.onClickCopy}
            >
              <Icon name='copy' /> Copy URL
            </Button>
            <Button
              disabled={disable}
              color='red'
              onClick={() => window.location.href = url}
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

export default Home
