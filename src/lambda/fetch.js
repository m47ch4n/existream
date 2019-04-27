import axios from 'axios'
import { durationToSeconds } from '../tools'

const { YT_KEY } = process.env

function fetchPlaylist(list_id) {
  return axios.get(
    'https://www.googleapis.com/youtube/v3/playlistItems',
    {
      params: {
        key: YT_KEY,
        playlistId: list_id,
        part: 'contentDetails',
        maxResults: 50
    }
  })
  .then(({ data }) => data.items.map(video => video.contentDetails.videoId))
  .catch(_error => null)
}

function fetchVideos(id) {
  if(!id) return null
  return axios.get(
    'https://www.googleapis.com/youtube/v3/videos',
    {
      params: {
        key: YT_KEY,
        id: id.join(),
        part: "snippet,contentDetails",
        maxResults: 50
      }
    }
  )
  .then(({ data }) => {
    return data.items.map(item => {
      const {
        id: id,
        contentDetails: {
          duration: duration
        },
        snippet: {
          title: title,
          thumbnails: {
            default: { url: thumbnail }
          }
        }
      } = item
      return {
        id,
        title,
        thumbnail,
        duration: durationToSeconds(duration)
      }
    })
  })
  .catch(_error => null)
}

exports.handler = async (event, _context) => {
  const { video_id, list_id } = event.queryStringParameters
  const id = video_id ? [video_id] : await fetchPlaylist(list_id)
  const videos = await fetchVideos(id)

  if (!videos) {
    return {
      statusCode: 400,
      body: "bad request"
    }
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(videos)
    }
  }
}