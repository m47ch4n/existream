import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { shareTwitter } from '../tools'

export default ({disabled, url}) => (
  <Button
    disabled={disabled}
    color='twitter'
    href={shareTwitter(url)}
    target='_blank'
  >
    <Icon name='twitter' /> Share Twitter
  </Button>
)
