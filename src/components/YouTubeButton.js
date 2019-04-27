import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default (props) => (
  <Button
    color='red'
    target='_blank'
    {...props}
  >
    <Icon name='play' /> on YouTube
  </Button>
)
