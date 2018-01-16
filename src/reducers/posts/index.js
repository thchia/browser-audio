import * as types from '../../actions/posts/types'

export const initialPosts = {
  fetching: false,
  posts: [],
  error: '',
  sortBy: 'title',
  sortOrder: 'asc',
  groupByUserId: false
}

export default (state = initialPosts, action) => {
  switch (action.type) {
    case types.REQUEST_POSTS:
      return { ...state, fetching: true, error: '' }
    case types.POSTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        posts: action.payload.posts
      }
    case types.POSTS_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload.error
      }
    case types.UPDATE_SORT_BY:
      return { ...state, sortBy: action.payload.sortBy }
    case types.TOGGLE_SORT_ORDER:
      return { ...state, sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' }
    case types.TOGGLE_GROUP_BY_USER_ID:
      return { ...state, groupByUserId: !state.groupByUserId }
    default:
      return state
  }
}
