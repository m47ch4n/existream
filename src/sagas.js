import { all, takeEvery, put, call, delay } from 'redux-saga/effects'
import axios from 'axios'
import actions from './actions'

function apiFetch(payload) {
  return axios.get(
    '/.netlify/functions/fetch',
    { params: { playlistId: payload.list }}
  )
  .then(({ data }) => ({ playlist: data, error: null }))
  .catch(error => ({ playlist: null, error }))
}

function* fetch(action) {
  const { playlist, error } = yield call(apiFetch, action.payload)
  if (playlist && !error) {
    yield put(actions.successFetch(playlist))
  } else {
    yield put(actions.failureFetch())
  }
}

function* countSaga(action) {
  while (true) {
    yield put(actions.tick())
    yield delay(1000)
  }
}

export default function* () {
  yield all([
    takeEvery(actions.fetch.toString(), fetch),
    takeEvery(actions.successFetch.toString(), countSaga)
  ])
}
