import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import actions from './actions'

const initialState = {
  list_id: '',
  playlist: [],
  offset: 2,
  base_time: ''
}

export default (history) => combineReducers({
  router: connectRouter(history),
  app: handleActions({
    [actions.successFetchPlaylist]: (store, action) => ({
      ...store
    })
  }, initialState),
})
