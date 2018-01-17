import * as actions from './'
import * as types from './types'

describe('posts action creators', () => {
  it('creates action to request posts', () => {
    const expectedResult = {
      type: types.REQUEST_POSTS,
      payload: {}
    }
    expect(actions.requestPosts()).toEqual(expectedResult)
  })

  it('creates an action for posts success', () => {
    const expectedResult = {
      type: types.POSTS_SUCCESS,
      payload: { posts: [] }
    }
    expect(actions.postsSuccess([])).toEqual(expectedResult)
  })

  it('creates action for failed posts', () => {
    const expectedResult = {
      type: types.POSTS_FAILED,
      payload: { error: 'Test Error' }
    }
    expect(actions.postsFailed('Test Error')).toEqual(expectedResult)
  })

  it('creates action to update sortBy', () => {
    const expectedResult = {
      type: types.UPDATE_SORT_BY,
      payload: { sortBy: 'title' }
    }
    expect(actions.updateSortBy('title')).toEqual(expectedResult)
  })

  it('creates action to toggle sort order', () => {
    const expectedResult = {
      type: types.TOGGLE_SORT_ORDER,
      payload: {}
    }
    expect(actions.toggleSortOrder()).toEqual(expectedResult)
  })

  it('creates action to toggle groupByUserId', () => {
    const expectedResult = {
      type: types.TOGGLE_GROUP_BY_USER_ID,
      payload: {}
    }
    expect(actions.toggleGroupByUserId()).toEqual(expectedResult)
  })
})
