import * as actions from '../../actions/users'
import reducer, { initialUsers } from './'

describe('users reducer', () => {
  it('returns state by default', () => {
    const expectedResult = initialUsers
    const result = reducer(undefined, { type: undefined })
    expect(result).toEqual(expectedResult)
  })

  it('handles REQUEST_USERS', () => {
    const expectedResult = {
      ...initialUsers,
      fetching: true,
      error: ''
    }
    const result = reducer(initialUsers, actions.requestUsers())
    expect(result).toEqual(expectedResult)
  })

  it('handles USERS_SUCCESS', () => {
    const expectedResult = {
      ...initialUsers,
      fetching: false,
      users: [{ id: 1 }]
    }
    const result = reducer(initialUsers, actions.usersSuccess([{ id: 1 }]))
    expect(result).toEqual(expectedResult)
  })

  it('handles USERS_FAILED', () => {
    const expectedResult = {
      ...initialUsers,
      fetching: false,
      error: 'Test Error'
    }
    const result = reducer(initialUsers, actions.usersFailed('Test Error'))
    expect(result).toEqual(expectedResult)
  })
})
