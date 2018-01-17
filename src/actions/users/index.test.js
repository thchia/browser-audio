import * as actions from './'
import * as types from './types'

describe('users action creators', () => {
  it('creates action to request users', () => {
    const expectedResult = {
      type: types.REQUEST_USERS,
      payload: {}
    }
    expect(actions.requestUsers()).toEqual(expectedResult)
  })

  it('creates action for users success', () => {
    const expectedResult = {
      type: types.USERS_SUCCESS,
      payload: { users: [] }
    }
    expect(actions.usersSuccess([])).toEqual(expectedResult)
  })

  it('creates action for failed users', () => {
    const expectedResult = {
      type: types.USERS_FAILED,
      payload: { error: 'Test Error' }
    }
    expect(actions.usersFailed('Test Error')).toEqual(expectedResult)
  })
})
