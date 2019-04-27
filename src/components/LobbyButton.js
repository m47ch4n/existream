import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default (props) => (
  <Button
    color='red'
    {...props}
  >
    <Icon name='play' /> Go to lobby
  </Button>
)
