import * as types from '../../actions/tracks/types'
import { updateInArray } from '../helpers'

export const initialState = {
  playing: false,
  volume: 1,
  muted: false,
  currentTime: 0,
  lastSeekedTime: 0,
  tracks: [
    {
      id: 1,
      name: 'Back in Black',
      src:
        'https://upload.wikimedia.org/wikipedia/en/4/45/ACDC_-_Back_In_Black-sample.ogg',
      added: false,
      node: undefined
    },
    {
      id: 2,
      name: 'Another Day in Paradise',
      src:
        'https://upload.wikimedia.org/wikipedia/en/9/9f/Sample_of_%22Another_Day_in_Paradise%22.ogg',
      added: false,
      node: undefined
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_TRACK:
      const registeredTrackIndex = state.tracks.findIndex(
        track => track.id === action.payload.id
      )

      const registeredTrack = {
        ...state.tracks[registeredTrackIndex],
        added: true,
        node: action.payload.node
      }
      const splicedTracks = updateInArray(
        state.tracks,
        registeredTrackIndex,
        registeredTrack
      )
      return { ...state, tracks: splicedTracks }
    case types.UNREGISTER_TRACK:
      const existingTrackIndex = state.tracks.findIndex(
        track => track.id === action.payload.id
      )
      if (existingTrackIndex < 0) return state
      const unregisteredTrack = {
        ...state.tracks[existingTrackIndex],
        added: false,
        node: undefined
      }
      const newTracks = updateInArray(
        state.tracks,
        existingTrackIndex,
        unregisteredTrack
      )
      return { ...state, tracks: newTracks }
    case types.TOGGLE_MASTER_PLAY:
      return { ...state, playing: true }
    case types.TOGGLE_MASTER_MUTE:
      return { ...state, muted: !state.muted }
    case types.UPDATE_MASTER_CURRENT_TIME:
      return { ...state, currentTime: action.payload.time }
    case types.SEEK_TIME:
      return {
        ...state,
        currentTime: action.payload.time,
        lastSeekedTime: action.payload.time
      }
    case types.STOP_MASTER_TRACK:
      const wasPlaying = state.playing
      let newState = { ...state, playing: false }
      if (!wasPlaying) {
        newState = { ...newState, currentTime: 0 }
      }
      return newState
    case types.TOGGLE_ADD_TRACK:
      const indexToToggle = state.tracks.findIndex(
        track => track.id === action.payload.id
      )
      if (indexToToggle < 0) {
        return state
      }
      const toggledTrack = {
        ...state.tracks[indexToToggle],
        added: !state.tracks[indexToToggle].added
      }
      const addedTracks = updateInArray(
        state.tracks,
        indexToToggle,
        toggledTrack
      )
      return { ...state, tracks: addedTracks }
    case types.TOGGLE_MUTE_SINGLE_TRACK: {
      const indexToToggle = state.tracks.findIndex(
        track => track.id === action.payload.id
      )
      if (indexToToggle < 0) return state
      if (!state.tracks[indexToToggle].added) return state
      const toggledTrack = {
        ...state.tracks[indexToToggle],
        muted: !state.tracks[indexToToggle].muted
      }
      const newTracks = updateInArray(state.tracks, indexToToggle, toggledTrack)
      return { ...state, tracks: newTracks }
    }
    default:
      return state
  }
}

export const tracksSelector = state => state.tracks
export const singleTrackSelector = state => tracksSelector(state).tracks
export const singleTrackAttributeSelector = state => id => attr => {
  const track = singleTrackSelector(state).find(track => track.id === id)
  if (track) {
    return track[attr]
  }
}
export const addedTracksSelector = state =>
  singleTrackSelector(state).filter(track => track.added && track.node)
