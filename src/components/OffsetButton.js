import React from 'react'
import { Container, Input, Label } from 'semantic-ui-react'

export default (props) => (
  <Container>
    <Input
      labelPosition='right'
      type='number'
      min='0'
      max='10'
      {...props}
    >
      <Label>Offset time</Label>
      <input />
      <Label basic>sec</Label>
    </Input>
  </Container>
)
