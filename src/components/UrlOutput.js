import React from 'react'
import { Container, Input } from 'semantic-ui-react'

export default ({ onClick, disabled, value }) => (
  <Container>
    <label>Lobby URL</label>
    <Input
      fluid
      action={{
        color: 'teal',
        labelPosition: 'right',
        icon: 'copy',
        content: 'Copy',
        onClick: onClick
      }}
      label='https://'
      disabled={disabled}
      id='url'
      value={value}
    />
  </Container>
)
