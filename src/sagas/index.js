import { all } from 'redux-saga/effects'

import api from '../utils/api'
import injectedLogger from '../utils/logger'
import makePostsSaga from './posts'
import makeUsersSaga from './users'

export default function makeRootSaga(
  injectedAPI = api,
  logger = injectedLogger
) {
  return function* rootSaga() {
    yield all([
      ...makePostsSaga(injectedAPI, injectedLogger),
      ...makeUsersSaga(injectedAPI, injectedLogger)
    ])
  }
}
