import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { Button, Container } from 'semantic-ui-react'

import { interval } from '../tools'

class PickButton extends Component {
  render() {
    return (
      <Button onClick={this.props.onClick} fluid>
        {this.props.value}
      </Button>
    )
  }
}

PickButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
}

export default (props) => (
  <Container>
    <label>Scheduled date</label>
    <DatePicker
      customInput={<PickButton />}
      showTimeSelect
      timeFormat="hh:mm aa"
      timeIntervals={interval}
      dateFormat="MM/dd/yyyy hh:mm aa"
      {...props}
    />
  </Container>
)
