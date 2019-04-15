import { handleActions } from 'redux-actions'
import actions from './actions'

const initialState = {
  list_id: '',
  playlist: [],
  offset: 2,
  base_time: ''
}

export default () => handleActions({
  [actions.successFetchPlaylist]: (store, action) => ({
    ...store
  })
}, initialState)
