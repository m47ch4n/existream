import { createActions } from 'redux-actions'

export default createActions(
  'TICK',
  'FETCH',
  'SYNC_VIDEO',
  'CLOSE_VIDEO',
  'CHANGE_OFFSET',
  'SUCCESS_FETCH',
  'FAILURE_FETCH'
)
