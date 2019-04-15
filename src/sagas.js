import { all, fork, takeEvery, put, call } from 'redux-saga/effects'
import axios from 'axios'

const yt_key = ''

function apiPlaylist() {
  return axios.get('', {
    params: {
      key: yt_key,
    }
  })
  .then(({ data }) => { return data })
}

export default function* () {
  yield all([
  ])
}
