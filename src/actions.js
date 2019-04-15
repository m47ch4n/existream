import { createActions } from 'redux-actions'

export default () => createActions(
  'FETCH_PLAYLIST',
  'SUCCESS_FETCH_PLAYLIST',
  'FAILURE_FETCH_PLAYLIST'
)
