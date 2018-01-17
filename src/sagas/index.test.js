import SagaTester from 'redux-saga-tester'
import { createStore } from 'redux'

import { postsSuccess, requestPosts } from '../actions/posts'
import { POSTS_SUCCESS } from '../actions/posts/types'
import { requestUsers, usersSuccess } from '../actions/users'
import { USERS_SUCCESS } from '../actions/users/types'

import rootReducer from '../reducers'
import makeRootSaga from './'
import mockAPI from '../utils/mockAPI'

const initialState = createStore(rootReducer).getState()
const rootSaga = makeRootSaga(mockAPI, console)

const saga = new SagaTester({ initialState, reducers: rootReducer })
saga.start(rootSaga)

describe('saga integration test', () => {
  it('calls getPosts and dispatches actions', async () => {
    saga.dispatch(requestPosts())
    await saga.waitFor(POSTS_SUCCESS)
    const lastAction = saga.getLatestCalledAction()
    expect(mockAPI.getPosts).toHaveBeenCalled()
    expect(lastAction).toEqual(postsSuccess([{ id: 1 }, { id: 2 }]))
  })

  it('calls getUsers and dispatches actions', async () => {
    saga.dispatch(requestUsers())
    await saga.waitFor(USERS_SUCCESS)
    const lastAction = saga.getLatestCalledAction()
    expect(mockAPI.getUsers).toHaveBeenCalled()
    expect(lastAction).toEqual(
      usersSuccess([{ username: 'Adam' }, { username: 'Zoey' }])
    )
  })
})
