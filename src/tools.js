import { stringify } from 'query-string'

export const durationToSeconds = (duration) => {
  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  // eslint-disable-next-line
  match = match.slice(1).map(function(x) {
    if (x != null) return x.replace(/\D/, '')
  })

  let hours = (parseInt(match[0]) || 0)
  let minutes = (parseInt(match[1]) || 0)
  let seconds = (parseInt(match[2]) || 0)

  return hours * 3600 + minutes * 60 + seconds
}

export const shareTwitter = (url) => {
  const text = 'Synchronize YouTube contents on existream!'
  const hashtags = 'existream'
  return 'https://twitter.com/intent/tweet?'+stringify({url, text, hashtags})
}

export const interval = 2

export const ceilMnutes = (date) => {
  const minutes = date.getMinutes() + 1
  const newMinutes = interval * Math.ceil(minutes / interval)
  date.setMinutes(newMinutes)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}