import * as types from './types'

export const requestPosts = () => ({
  type: types.REQUEST_POSTS,
  payload: {}
})

export const postsSuccess = posts => ({
  type: types.POSTS_SUCCESS,
  payload: { posts }
})

export const postsFailed = error => ({
  type: types.POSTS_FAILED,
  payload: { error }
})

export const updateSortBy = sortBy => ({
  type: types.UPDATE_SORT_BY,
  payload: { sortBy }
})

export const toggleSortOrder = () => ({
  type: types.TOGGLE_SORT_ORDER,
  payload: {}
})

export const toggleGroupByUserId = () => ({
  type: types.TOGGLE_GROUP_BY_USER_ID,
  payload: {}
})
