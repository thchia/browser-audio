import * as types from '../../actions/users/types'

const initialUsers = {
  fetching: false,
  users: [],
  error: ''
}

export default (state = initialUsers, action) => {
  switch (action.type) {
    case types.REQUEST_USERS:
      return { ...state, fetching: true, error: '' }
    case types.USERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        users: action.payload.users
      }
    case types.USERS_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload.error
      }
    default:
      return state
  }
}
