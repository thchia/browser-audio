import { call, put, takeLatest } from 'redux-saga/effects'

import * as actions from '../../actions/users'
import * as types from '../../actions/users/types'

export function makeGetUsersSaga(api, logger) {
  return function* getUsersSaga(action = { payload: {} }) {
    try {
      const response = yield call(api.getUsers)
      const users = yield call([response, response.json])
      yield put(actions.usersSuccess(users))
    } catch (err) {
      const usersError = 'Error getting users'
      const logError = err.message || usersError
      yield call(logger.log, logError)
      yield put(actions.usersFailed(usersError))
    }
  }
}

export default (api, logger) => [
  takeLatest(types.REQUEST_USERS, makeGetUsersSaga(api, logger))
]
