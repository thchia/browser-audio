import { combineReducers } from 'redux'

import trackReducer from './tracks'
import postsReducer from './posts'
import usersReducer from './users'

export default combineReducers({
  posts: postsReducer,
  tracks: trackReducer,
  users: usersReducer
})
