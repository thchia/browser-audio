import { call, put, takeLatest } from 'redux-saga/effects'

import * as actions from '../../actions/posts'
import * as types from '../../actions/posts/types'

export function makeGetPostsSaga(api, logger) {
  return function* getPostsSaga(action = { payload: {} }) {
    try {
      const response = yield call(api.getPosts)
      const posts = yield call([response, response.json])
      yield put(actions.postsSuccess(posts))
    } catch (err) {
      const postsError = 'Error getting posts'
      const logError = err.message || postsError
      yield call(logger.log, logError)
      yield put(actions.postsFailed(postsError))
    }
  }
}

export default (api, logger) => [
  takeLatest(types.REQUEST_POSTS, makeGetPostsSaga(api, logger))
]
