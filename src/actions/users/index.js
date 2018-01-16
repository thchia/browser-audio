import * as types from './types'

export const requestUsers = () => ({
  type: types.REQUEST_USERS,
  payload: {}
})

export const usersSuccess = users => ({
  type: types.USERS_SUCCESS,
  payload: { users }
})

export const usersFailed = error => ({
  type: types.USERS_FAILED,
  payload: { error }
})
