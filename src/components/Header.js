import React from 'react'
import { Header, Image } from 'semantic-ui-react'

import './Header.css'
import logo from '../logo.svg'

export default () => (
  <Header as='h1' image inverted>
    <Image src={logo} href='/' />
    existream
    <Header.Subheader>Synchronize YouTube contents</Header.Subheader>
  </Header>
)
