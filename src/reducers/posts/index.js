import * as types from '../../actions/posts/types'

import { usersSelector } from '../users'

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

export const postsSelector = state => state.posts
export const sortedPostsWithUsernames = state => {
  const users = usersSelector(state).users
  const posts = [...postsSelector(state).posts]
  const { groupByUserId, sortBy, sortOrder } = postsSelector(state)

  const postsWithUsername = posts.map(post => {
    const user = users.find(user => user.id === post.userId)
    if (!user) return post
    return { ...post, username: user.username }
  })

  if (groupByUserId) {
    return postsWithUsername.reduce((acc, curr) => {
      const currentUserId = curr.userId
      if (acc[currentUserId]) {
        acc[currentUserId].posts = [...acc[currentUserId].posts, curr]
      } else {
        acc[currentUserId] = { username: curr.username, posts: [curr] }
      }
      return acc
    }, {})
  }

  return postsWithUsername.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })
}
