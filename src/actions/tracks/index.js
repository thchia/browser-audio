import * as types from './types'

export const registerTrack = (node, id) => ({
  type: types.REGISTER_TRACK,
  payload: { node, id }
})

export const unregisterTrack = id => ({
  type: types.UNREGISTER_TRACK,
  payload: { id }
})

export const toggleMasterPlay = () => ({
  type: types.TOGGLE_MASTER_PLAY,
  payload: {}
})

export const toggleMasterMute = () => ({
  type: types.TOGGLE_MASTER_MUTE,
  payload: {}
})

export const toggleMuteSingleTrack = id => ({
  type: types.TOGGLE_MUTE_SINGLE_TRACK,
  payload: { id }
})

export const updateMasterCurrentTime = time => ({
  type: types.UPDATE_MASTER_CURRENT_TIME,
  payload: { time }
})

export const seekTime = time => ({
  type: types.SEEK_TIME,
  payload: { time }
})

export const stopMasterTrack = () => ({
  type: types.STOP_MASTER_TRACK,
  payload: {}
})

export const toggleAddTrack = id => ({
  type: types.TOGGLE_ADD_TRACK,
  payload: { id }
})
