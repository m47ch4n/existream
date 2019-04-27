import React from 'react'
import { Container, Checkbox } from 'semantic-ui-react'

export default (props) => (
  <Container>
    <Checkbox
      label={
        <label
          style={{color: 'white'}}
        >
          Watch on existream
        </label>
      }
      {...props}
    />
  </Container>
)
