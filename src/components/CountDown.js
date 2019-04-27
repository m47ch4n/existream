import React from 'react'
import { Statistic } from 'semantic-ui-react'

export default ({ countdown }) => {
  return countdown ?
    <Statistic style={{display: 'block'}} inverted color='grey'>
      <Statistic.Label>Countdown</Statistic.Label>
      <Statistic.Value>{countdown}</Statistic.Value>
    </Statistic>
  : null
}
