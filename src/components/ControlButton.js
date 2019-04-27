import React from 'react'
import { Button, Icon, Container } from 'semantic-ui-react'

export default ({ watch, play_video, closeVideo, syncVideo }) => {
  return !watch ?
    <Button onClick={syncVideo}>
      <Icon name='play' /> on existream
    </Button>
    : play_video ?
      <Container className='controller'>
        <Button icon onClick={closeVideo} labelPosition='left'>
          <Icon name='stop' />
          Stop
        </Button>
        <Button icon onClick={syncVideo} labelPosition='right'>
          Sync
          <Icon name='sync' />
        </Button>
      </Container>
    : null
}
