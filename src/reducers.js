import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { stringify } from 'query-string'
import actions from './actions'

const initialState = {
  list_id: null,
  playlist: null,
  offset: 1,
  url: null,
  countdown: null,
  video: null,
  video_index: null,
  time: null,
  isLoaded: false
}

const getUrl = (v, list, index, t) => (
  'https://www.youtube.com/watch?'+stringify({v, list, index, t})
)

const calcNow = (offset, base_time, videos, list_id) => {
  const base = new Date(base_time)
  const diff_ms = Date.now() - base.getTime()
  const diff_s = Math.ceil(diff_ms / 1000) + offset
  if (diff_s <= 0) {
    return {
      countdown: -diff_s,
      url: null
    }
  }
  const acc_s = videos.reduce((acc, {duration}, i) => {
    acc[i+1] = acc[i] + duration
    return acc
  }, [0])
  const loop_s = acc_s[acc_s.length - 1]
  const nextVideoIndex = acc_s.findIndex((t) => {
    return t > (diff_s % loop_s)
  })
  const nows = {
    video: videos[nextVideoIndex-1],
    time: (diff_s % loop_s) - acc_s[nextVideoIndex-1],
    video_index: nextVideoIndex,
  }
  return {
    ...nows,
    countdown: null,
    url: getUrl(nows.video.id, list_id, nows.video_index, nows.time)
  }
}

export default (history) => combineReducers({
  router: connectRouter(history),
  app: handleActions({
    [actions.tick]: (state, _action) => ({
      ...state,
      ...calcNow(state.offset, state.base_time, state.playlist, state.list_id)
    }),
    [actions.fetch]: (state, action) => ({
      ...state,
      list_id: action.payload.list,
      base_time: action.payload.base_time
    }),
    [actions.successFetch]: (state, action) => ({
      ...state,
      playlist: action.payload,
      isLoaded: true
    }),
    [actions.failureFetch]: (state, _action) => ({
      ...state,
      isLoaded: true
    })
  }, initialState),
})
