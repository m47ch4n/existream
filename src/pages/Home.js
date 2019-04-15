import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Grid, Header, Image } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from '../logo.svg';
import queryString from 'query-string'

const mapStateToProps = (store) => ({
  store
})

const floorMnutes = (date, interval) => {
  const minutes = date.getMinutes()
  const newMinutes = interval * Math.floor(minutes / interval)
  date.setMinutes(newMinutes)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      playlist: '',
      date: floorMnutes(new Date(), 5),
      url: ''
    }
    this.onPlaylistChange = this.onPlaylistChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
  }

  onPlaylistChange({ target: { value: text }}) {
    const {query: { list: ls }} = queryString.parseUrl(text)
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
    const text = document.getElementById('url');
    text.select()
    document.execCommand('copy')
  }

  render() {
    const disable = !this.state.url || !this.state.playlist 
    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={logo} /> existream
          </Header>
          <Form>
            <Form.Input
              onChange={this.onPlaylistChange}
              value={this.state.playlist}
              placeholder='Playlist URL'
            />
            <div className='field'>
              <DatePicker
                selected={this.state.date}
                onChange={this.onDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                inline
              />
            </div>
            <Input disabled={disable} id='url' fluid size='small' value={this.state.url} className='field'/>
            <Button disabled={disable} color='teal' onClick={this.onClickCopy}>
              <Icon name='copy' /> Copy URL
            </Button>
            <Button disabled={disable} color='red' onClick={() => window.location.href = this.state.url}>
              <Icon name='play' /> Go to lobby
            </Button>
            <Button disabled={disable} color='twitter'>
              <Icon name='twitter' /> Share Twitter
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(Home)
