import * as actions from '../../actions/posts'
import reducer, { initialPosts, sortedPostsWithUsernames } from './'

describe('posts reducer', () => {
  it('returns state by default', () => {
    const expectedResult = initialPosts
    const result = reducer(undefined, { type: undefined })
    expect(result).toEqual(expectedResult)
  })

  it('handles REQUEST_POSTS', () => {
    const expectedResult = {
      ...initialPosts,
      fetching: true,
      error: ''
    }
    const result = reducer(initialPosts, actions.requestPosts())
    expect(result).toEqual(expectedResult)
  })

  it('handles POSTS_SUCCESS', () => {
    const expectedResult = {
      ...initialPosts,
      fetching: false,
      error: '',
      posts: [{ id: 1 }]
    }
    const result = reducer(initialPosts, actions.postsSuccess([{ id: 1 }]))
    expect(result).toEqual(expectedResult)
  })

  it('handles POSTS_FAILED', () => {
    const expectedResult = {
      ...initialPosts,
      error: 'Test Error'
    }
    const result = reducer(initialPosts, actions.postsFailed('Test Error'))
    expect(result).toEqual(expectedResult)
  })

  it('handles UPDATE_SORT_BY', () => {
    const expectedResult = {
      ...initialPosts,
      sortBy: 'username'
    }
    const result = reducer(initialPosts, actions.updateSortBy('username'))
    expect(result).toEqual(expectedResult)
  })

  it('handles TOGGLE_SORT_ORDER', () => {
    const expectedResult = {
      ...initialPosts,
      sortOrder: initialPosts.sortOrder === 'asc' ? 'desc' : 'asc'
    }
    const result = reducer(initialPosts, actions.toggleSortOrder())
    expect(result).toEqual(expectedResult)
  })

  it('handles TOGGLE_GROUP_BY_USER_ID', () => {
    const expectedResult = {
      ...initialPosts,
      groupByUserId: !initialPosts.groupByUserId
    }
    const result = reducer(initialPosts, actions.toggleGroupByUserId())
    expect(result).toEqual(expectedResult)
  })
})

describe('posts selector', () => {
  it('sorts correctly', () => {
    const state = {
      posts: {
        posts: [{ userId: 1 }, { userId: 2 }],
        sortBy: 'username',
        sortOrder: 'desc'
      },
      users: {
        users: [{ id: 1, username: 'Adam' }, { id: 2, username: 'Zoey' }]
      }
    }
    const expectedResult = [
      { userId: 2, username: 'Zoey' },
      { userId: 1, username: 'Adam' }
    ]
    const result = sortedPostsWithUsernames(state)
    expect(result).toEqual(expectedResult)
  })
})
