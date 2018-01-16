import { combineReducers } from 'redux'

import trackReducer from './tracks'

export default combineReducers({
  tracks: trackReducer
})
