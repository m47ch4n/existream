import React from 'react'
import { Header, Image } from 'semantic-ui-react'

import './Header.css'
import logo from '../logo.svg'

export default () => (
  <Header
    as='h1'
    image
    inverted
  >
    <div
      className='title'
      onClick={() => window.location.href = '/'}
    >
      <Image src={logo} />
      existream
    </div>
    <Header.Subheader>Synchronize YouTube contents.</Header.Subheader>
  </Header>
)
