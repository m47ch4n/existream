import React from 'react'
import { Container, Input, Label } from 'semantic-ui-react'

export default (props) => (
  <Container id='offset-button'>
    <Input
      labelPosition='right'
      type='number'
      min='0'
      max='10'
      {...props}
    >
      <Label>Offsets</Label>
      <input />
      <Label basic>sec</Label>
    </Input>
  </Container>
)
