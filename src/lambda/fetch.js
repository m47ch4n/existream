import axios from 'axios'
import { durationToSeconds } from '../tools'

const { YT_KEY } = process.env

function fetchPlaylist(list) {
  return axios.get(
    'https://www.googleapis.com/youtube/v3/playlistItems',
    {
      params: {
        key: YT_KEY,
        playlistId: list,
        part: 'contentDetails',
        maxResults: 50
    }
  })
  .then(({ data }) => data.items.map(video => video.contentDetails.videoId))
  .catch(_error => null)
}

function fetchVideos(ids) {
  if(!ids) return null
  return axios.get(
    'https://www.googleapis.com/youtube/v3/videos',
    {
      params: {
        key: YT_KEY,
        id: ids.join(),
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
  const { playlistId } = event.queryStringParameters
  const playlist = await fetchPlaylist(playlistId)
  const videos = await fetchVideos(playlist)

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