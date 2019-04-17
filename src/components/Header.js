import React from 'react'
import { Header, Image } from 'semantic-ui-react'

import logo from '../logo.svg'

export default () => (
  <Header
    as='h2'
    image
    inverted
    style={{cursor: 'pointer'}}
    onClick={() => window.location.href = '/'}
  >
    <Image src={logo} />
    existream
    <Header.Subheader>Synchronize(Stream) YouTube playlist.</Header.Subheader>
  </Header>
)
