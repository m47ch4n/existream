import React from 'react'
import { Container } from 'semantic-ui-react'
import YouTube from 'react-youtube'
import './Viewer.css'

export default ({ watch, start, syncVideo, video }) => {
  return video && watch ?
    <Container fluid className='viewer'>
      <YouTube
        opts={{
          playerVars: {
            autoplay: 1,
            rel: 0,
            start: start
          }
        }}
        onEnd={syncVideo}
        videoId={video.id}
      />
    </Container>
  : null
}
