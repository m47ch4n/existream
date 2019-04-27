import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

class DatePickButton extends Component {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        fluid
      >
        {this.props.value}
      </Button>
    )
  }
}

DatePickButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

export default DatePickButton
