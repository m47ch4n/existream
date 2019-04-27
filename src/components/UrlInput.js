import React from 'react'
import { Container, Input } from 'semantic-ui-react'

export default (props) => (
  <Container>
    <label>YouTube content URL</label>
    <Input
      placeholder='Paste full URL'
      fluid
      {...props}
    />
  </Container>
)
