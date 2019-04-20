import React from 'react'
import { Item, Label, Segment, Progress, Container } from 'semantic-ui-react'

import './VideoCard.css'

const VideoCard = ({ video, video_index, videos, time }) => (
  <Container>
    <Segment className='video-segment'>
      <Item.Group>
        <Item>
          <Item.Image size='small' src={video.thumbnail} />
          <Item.Content>
            <Item.Header as='marquee'>{video.title}</Item.Header>
            <Item.Extra>
              <Label icon='list' content={`${video_index} / ${videos}`} />
              <Label icon='clock' content={`${video.duration} sec`} />
              <Label icon='linkify' content={video.id} />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
    <Progress
      active
      color='red'
      value={time}
      total={video.duration}
      attached='bottom'
    />
  </Container>
)

export default VideoCard