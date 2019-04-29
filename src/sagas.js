import { all, takeEvery, put, call, cancel, delay, fork, take } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import axios from 'axios'
import actions from './actions'

function apiFetch(payload) {
  return axios.get(
    '/.netlify/functions/fetch',
    { params: payload }
  )
  .then(({ data }) => ({ playlist: data, error: null }))
  .catch(error => ({ playlist: null, error }))
}

function* fetch(action) {
  const { playlist, error } = yield call(apiFetch, action.payload)
  if (playlist && !error) {
    yield put(actions.successFetch(playlist))
    if (action.payload.watch) {
      yield put(actions.syncVideo(action.payload.watch))
    }
  } else {
    yield put(actions.failureFetch())
  }
}

function* countSaga(_action) {
  const watcher = yield fork(function* () {
    while (true) {
      yield put(actions.tick())
      yield delay(1000)
    }
  })

  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export default function* () {
  yield all([
    takeEvery(actions.fetch.toString(), fetch),
    takeEvery(actions.successFetch.toString(), countSaga)
  ])
}
